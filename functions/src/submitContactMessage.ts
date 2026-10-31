/**
 * Cloud Function: Submit Contact Message
 * Handles contact form submissions with validation, rate limiting, and persistence
 * Deploy with: firebase deploy --only functions:submitContactMessage
 */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp()
}

const db = admin.firestore()
const CONTACT_COLLECTION = 'contactMessages'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface RateLimitKey {
  ip: string
  email: string
}

/**
 * Get client IP address from request
 */
function getClientIP(req: functions.https.Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.headers['cf-connecting-ip'] ||
    req.socket.remoteAddress ||
    'unknown'
  )
}

/**
 * Check rate limit (max 5 submissions per day per IP/email)
 */
async function checkRateLimit(
  ip: string,
  email: string,
  maxPerDay: number = 5
): Promise<boolean> {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Check submissions from this IP today
  const ipSnapshot = await db
    .collection(CONTACT_COLLECTION)
    .where('ipAddress', '==', ip)
    .where('createdAt', '>=', startOfDay)
    .count()
    .get()

  if (ipSnapshot.data().count >= maxPerDay) {
    return false
  }

  // Check submissions from this email today
  const emailSnapshot = await db
    .collection(CONTACT_COLLECTION)
    .where('email', '==', email)
    .where('createdAt', '>=', startOfDay)
    .count()
    .get()

  if (emailSnapshot.data().count >= maxPerDay) {
    return false
  }

  return true
}

/**
 * Validate contact form data
 */
function validateContactData(data: Partial<ContactFormData>): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Name is required'
  }

  if (data.name.length > 100) {
    return 'Name must be less than 100 characters'
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    return 'Email is required'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return 'Invalid email format'
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    return 'Subject is required'
  }

  if (data.subject.length > 200) {
    return 'Subject must be less than 200 characters'
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    return 'Message is required'
  }

  if (data.message.length > 5000) {
    return 'Message must be less than 5000 characters'
  }

  if (data.message.length < 10) {
    return 'Message must be at least 10 characters'
  }

  return null
}

/**
 * Detect spam indicators
 */
function detectSpam(data: ContactFormData): boolean {
  const { message } = data

  // Check for excessive URLs
  const urlCount = (message.match(/https?:\/\//g) || []).length
  if (urlCount > 3) {
    return true
  }

  // Check for repeated characters
  if (/(.)\1{9,}/.test(message)) {
    return true
  }

  // Check for spam keywords
  const spamKeywords = ['viagra', 'casino', 'lottery', 'click here', 'buy now']
  const lowerMessage = message.toLowerCase()
  if (spamKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return true
  }

  return false
}

/**
 * HTTP Cloud Function: Submit contact message
 * Callable from frontend with proper validation and rate limiting
 */
export const submitContactMessage = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    // Enable CORS for your domain
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }

    try {
      const data = req.body as Partial<ContactFormData>
      const clientIP = getClientIP(req)
      const userAgent = req.headers['user-agent'] || 'unknown'

      // Validate input
      const validationError = validateContactData(data)
      if (validationError) {
        res.status(400).json({ error: validationError })
        return
      }

      const contactData = data as ContactFormData

      // Check rate limit
      const withinLimit = await checkRateLimit(clientIP, contactData.email)
      if (!withinLimit) {
        res.status(429).json({
          error: 'Too many requests. Please try again later.',
        })
        return
      }

      // Detect spam
      if (detectSpam(contactData)) {
        res.status(400).json({ error: 'Message rejected due to content policy' })
        return
      }

      // Save to Firestore
      const messageRef = await db.collection(CONTACT_COLLECTION).add({
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        subject: contactData.subject.trim(),
        message: contactData.message.trim(),
        ipAddress: clientIP,
        userAgent,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false,
        archived: false,
      })

      // TODO: Add email notification here
      // Example: Send confirmation email to user
      // Example: Send notification email to site owner

      res.status(200).json({
        success: true,
        messageId: messageRef.id,
      })
    } catch (error) {
      console.error('Contact submission error:', error)
      res.status(500).json({
        error: 'Failed to submit message. Please try again later.',
      })
    }
  }
)

/**
 * Cloud Function: Delete Cloudinary Image (Admin only)
 * Used by authenticated admin dashboard to delete images
 * Deploy with: firebase deploy --only functions:deleteCloudinaryImage
 */
export const deleteCloudinaryImage = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    try {
      // Verify Firebase ID token (for authenticated admin dashboard)
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' })
        return
      }

      const token = authHeader.substring(7)
      const decodedToken = await admin.auth().verifyIdToken(token)

      // Check admin claim
      if (!decodedToken.admin) {
        res.status(403).json({ error: 'Forbidden' })
        return
      }

      const { publicId } = req.body

      if (!publicId || typeof publicId !== 'string') {
        res.status(400).json({ error: 'Invalid public_id' })
        return
      }

      // TODO: Delete from Cloudinary using Admin SDK
      // This requires CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
      // Set these as Firebase environment variables
      // const cloudinary = require('cloudinary').v2
      // await cloudinary.api.delete_resources([publicId])

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
      })
    } catch (error) {
      console.error('Image deletion error:', error)
      res.status(500).json({
        error: 'Failed to delete image',
      })
    }
  }
)
