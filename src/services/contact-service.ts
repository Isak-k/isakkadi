/**
 * Contact form submission service
 * Handles validation and Cloud Function integration
 */

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmissionResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Validate contact form inputs
 * Client-side validation before submission
 */
export function validateContactForm(data: ContactFormData): string | null {
  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    return 'Name is required'
  }
  if (data.name.length > 100) {
    return 'Name must be less than 100 characters'
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return 'Please enter a valid email address'
  }
  if (data.email.length > 254) {
    return 'Email is too long'
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length === 0) {
    return 'Subject is required'
  }
  if (data.subject.length > 200) {
    return 'Subject must be less than 200 characters'
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
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
 * Submit contact form via Cloud Function
 * The backend Cloud Function handles:
 * - Rate limiting per IP/email
 * - Spam detection
 * - Email notifications
 * - Firestore persistence
 *
 * @param data - Contact form data
 * @returns Result with success status and optional error message
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  // Client-side validation first
  const validationError = validateContactForm(data)
  if (validationError) {
    return {
      success: false,
      error: validationError,
    }
  }

  try {
    // Call Cloud Function via HTTPS endpoint
    const functionUrl = import.meta.env.VITE_CONTACT_FUNCTION_URL
    if (!functionUrl) {
      return {
        success: false,
        error: 'Contact service is not configured. Please try again later.',
      }
    }

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = (errorData as Record<string, unknown>).error || 'Failed to submit contact form'

      // Handle specific error cases
      if (response.status === 429) {
        return {
          success: false,
          error: 'Too many requests. Please try again later.',
        }
      }
      if (response.status === 400) {
        return {
          success: false,
          error: errorMessage as string,
        }
      }

      return {
        success: false,
        error: 'Failed to submit your message. Please try again.',
      }
    }

    const result = await response.json() as { messageId: string }
    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    }
  }
}
