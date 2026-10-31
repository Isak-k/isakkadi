# Firebase Backend Setup Guide

This guide covers the complete setup of Firebase backend infrastructure for Isak Kadi's portfolio, including Firestore, Cloudinary integration, Cloud Functions, and security configuration.

## Table of Contents

1. [Firebase Project Setup](#firebase-project-setup)
2. [Environment Configuration](#environment-configuration)
3. [Firestore Collections](#firestore-collections)
4. [Cloudinary Setup](#cloudinary-setup)
5. [Cloud Functions Deployment](#cloud-functions-deployment)
6. [Security Rules](#security-rules)
7. [Testing](#testing)
8. [Initial Data Seeding](#initial-data-seeding)

---

## Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name: `isak-kadi-portfolio`
4. Enable Google Analytics (optional)
5. Create the project

### Step 2: Enable Required Services

1. **Cloud Firestore**
   - Navigate to "Firestore Database"
   - Click "Create database"
   - Select region: `us-central1` (or closest to your audience)
   - Start in **Production mode**
   - Create database

2. **Authentication** (optional for future admin dashboard)
   - Navigate to "Authentication"
   - Click "Get Started"
   - Enable "Email/Password" provider

3. **App Check**
   - Navigate to "App Check"
   - Register your web app (we'll do this when configuring the client)

### Step 3: Create a Web App

1. In Project Settings, click "Add app"
2. Select "Web" (</> icon)
3. Register app as `isak-kadi-portfolio`
4. Copy the Firebase config
5. Save this config—you'll need it for environment variables

### Step 4: Set Up Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init --project isak-kadi-portfolio
```

When prompted:
- Select "Firestore" and "Functions"
- Use default locations
- Choose TypeScript for Cloud Functions

---

## Environment Configuration

### Frontend Environment Variables

Create `.env.local` with values from your Firebase project:

```env
# Firebase Configuration (from Firebase Console > Project Settings)
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=12345678901
VITE_FIREBASE_APP_ID=1:12345678901:web:abcdef123456

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_images

# Cloud Function URLs (after deployment)
VITE_CONTACT_FUNCTION_URL=https://us-central1-your-project-id.cloudfunctions.net/submitContactMessage
VITE_DELETE_IMAGE_FUNCTION_URL=https://us-central1-your-project-id.cloudfunctions.net/deleteCloudinaryImage
```

### Backend Cloud Functions Environment

Create `functions/.env.local`:

```env
# Cloudinary API credentials (for signed uploads and deletions)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email service configuration
# SENDGRID_API_KEY=your_sendgrid_key
# SITE_OWNER_EMAIL=isak@example.com
```

**Important**: Never commit `.env.local` files. Add to `.gitignore`:

```
.env.local
functions/.env.local
```

---

## Firestore Collections

The backend uses these collections. You can seed them via Firebase Console or Cloud Functions.

### Collection: `projects`

Stores portfolio projects with publication and display metadata.

```typescript
{
  id: string (auto-generated doc ID)
  slug: string (unique identifier)
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  status: 'active' | 'maintained' | 'archived' | 'planned'
  publicationStatus: 'draft' | 'published' | 'archived'
  technologies: string[]
  
  // Cloudinary images
  thumbnailUrl: string (https://res.cloudinary.com/...)
  thumbnailPublicId: string (for deletion/replacement)
  galleryImages: [
    {
      publicId: string
      secureUrl: string
      format: string
      width: number
      height: number
    }
  ]
  
  // Links
  projectUrl: string
  githubUrl: string
  liveDemoUrl: string
  
  // Case study content
  overview: string
  problemStatement: string
  targetUsers: string
  solution: string
  features: string[]
  developmentProcess: string
  technicalDecisions: string
  challenges: string
  lessonsLearned: string
  
  // Metadata
  featured: boolean
  displayOrder: number
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Collection: `skills`

```typescript
{
  id: string
  name: string
  category: string
  description: string
  learningStatus: 'learning' | 'intermediate' | 'proficient'
  visible: boolean
  displayOrder: number
}
```

### Collection: `education`

```typescript
{
  id: string
  institution: string
  program: string
  startDate: string (ISO format)
  endDate: string (ISO format, null if ongoing)
  description: string
  achievements: string[]
  visible: boolean
  displayOrder: number
}
```

### Collection: `experience`

```typescript
{
  id: string
  title: string
  organization: string
  type: 'employment' | 'activity' | 'project'
  startDate: string (ISO format)
  endDate: string (ISO format, null if ongoing)
  description: string
  highlights: string[]
  visible: boolean
  displayOrder: number
}
```

### Collection: `siteContent`

Generic key-value store for site-wide content (hero text, about intro, etc.)

```typescript
{
  id: string
  key: string (unique key like 'about_intro', 'home_hero_subtitle')
  content: string (plain text or markdown)
  visible: boolean
  updatedAt: timestamp
}
```

### Collection: `contactMessages`

```typescript
{
  id: string (auto-generated)
  name: string
  email: string
  subject: string
  message: string
  ipAddress: string (for rate limiting)
  userAgent: string
  createdAt: timestamp
  read: boolean (for admin dashboard)
  archived: boolean
}
```

---

## Cloudinary Setup

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify email

### Step 2: Get API Credentials

1. Go to Dashboard
2. Copy your **Cloud Name**
3. Go to Settings > Upload
4. Copy **API Key** (save API Secret securely, backend only)

### Step 3: Create Upload Preset

1. Settings > Upload > Upload presets
2. Click "Add upload preset"
3. Name: `portfolio_images`
4. Unsigned mode: **Yes** (for unsigned uploads)
5. Allowed extensions: `jpg,jpeg,png,webp,gif`
6. Max file size: `5242880` (5MB)
7. Folder: `portfolio`
8. Resource type: `auto`
9. Save

### Step 4: Configure Environment Variables

Add to `.env.local`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_images
```

### Step 5: Test Upload

Frontend users can now upload images without backend involvement (for future admin dashboard).

---

## Cloud Functions Deployment

### Step 1: Set Up Local Environment

```bash
cd functions
npm install
```

### Step 2: Configure Environment

Edit `functions/.env.local` with Cloudinary credentials.

### Step 3: Deploy Functions

```bash
firebase deploy --only functions:submitContactMessage,functions:deleteCloudinaryImage
```

After deployment, note the function URLs. Add them to `.env.local`:

```env
VITE_CONTACT_FUNCTION_URL=https://us-central1-your-project-id.cloudfunctions.net/submitContactMessage
VITE_DELETE_IMAGE_FUNCTION_URL=https://us-central1-your-project-id.cloudfunctions.net/deleteCloudinaryImage
```

### Step 4: Test the Function

```bash
curl -X POST https://us-central1-your-project-id.cloudfunctions.net/submitContactMessage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message for the contact form."
  }'
```

Expected response:

```json
{
  "success": true,
  "messageId": "abc123..."
}
```

---

## Security Rules

### Deploy Firestore Rules

1. Copy content from `firestore.rules`
2. Go to Firebase Console > Firestore > Rules
3. Replace existing rules
4. Publish

### Rule Summary

- **Anonymous users**: Can read published projects, visible skills/education/experience, and public site content
- **Anonymous users**: Can submit contact messages only via Cloud Function (not direct writes)
- **Authenticated admins**: Full read/write access to all content
- **Default**: Deny all other access

---

## Testing

### Test Suite

Run tests with:

```bash
npm run test
```

Tests verify:

1. **Public reads**: Published projects are readable
2. **Restricted reads**: Unpublished projects are not readable
3. **Visibility filters**: Only visible content is returned
4. **Contact validation**: Required fields and length limits enforced
5. **Rate limiting**: Contact submissions limited per IP/email
6. **Cloudinary restrictions**: File size and format validation enforced
7. **Slug uniqueness**: Duplicate slugs are prevented

### Manual Testing

#### Test Contact Form Submission

1. Navigate to `/contact`
2. Fill in form with valid data
3. Submit
4. Check Firebase Console > Firestore > contactMessages for new document

#### Test Image Upload

1. Use browser console:
   ```javascript
   import { uploadProjectThumbnail } from '@services/cloudinary-upload-service'
   const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
   uploadProjectThumbnail(file, (progress) => console.log(progress.percent + '%'))
   ```
2. Verify image appears in Cloudinary dashboard
3. Verify secure_url and public_id are returned

#### Test Security Rules

1. Try to read unpublished project (should fail):
   ```javascript
   db.collection('projects').doc('unpublished-id').get()
   ```
2. Try to write contact message directly (should fail):
   ```javascript
   db.collection('contactMessages').add({ ... })
   ```

---

## Initial Data Seeding

### Option 1: Manual Entry via Firebase Console

1. Go to Firebase Console > Firestore
2. Create collection > collection name: `projects`
3. Add documents manually with JSON data

### Option 2: Cloud Function Seeding

Create a seeding function (for development only):

```typescript
// functions/src/seedData.ts
export const seedPortfolioData = functions.https.onRequest(async (req, res) => {
  // Verify admin authentication
  const projects = [
    {
      slug: 'boriif-tech',
      title: 'Boriif Tech',
      // ... full project data
    },
    // ... other projects
  ]

  for (const project of projects) {
    await db.collection('projects').add(project)
  }

  res.json({ success: true, count: projects.length })
})
```

Deploy and call:

```bash
curl https://us-central1-your-project-id.cloudfunctions.net/seedPortfolioData
```

---

## Troubleshooting

### Firebase Emulator Suite (Local Development)

Start the emulator:

```bash
firebase emulators:start
```

Connect frontend to emulator in `src/config/firebase.ts`:

```typescript
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, 'localhost', 8080)
}
```

### Common Issues

**Issue**: `VITE_FIREBASE_PROJECT_ID is undefined`
- **Solution**: Ensure `.env.local` is created and values match Firebase Console

**Issue**: Contact form returns 429 (rate limited)
- **Solution**: This is working correctly. Wait 24 hours or use different email/IP

**Issue**: Cloudinary upload fails with 401
- **Solution**: Check upload preset is configured correctly and set to Unsigned mode

**Issue**: Security rules denying access**
- **Solution**: Ensure rules file is deployed and document fields match rule conditions

---

## Next Steps

1. **For Admin Dashboard**: Set up Firebase Authentication custom claims for admin users
2. **Email Notifications**: Configure SendGrid or similar for contact form notifications
3. **Image CDN**: Consider Firebase CDN for even faster Cloudinary delivery
4. **Analytics**: Enable Firebase Analytics to track user engagement
5. **Backups**: Configure regular Firestore backups

---

## Important Security Reminders

- ✅ Never commit `.env.local` files
- ✅ Never expose API secrets in frontend code
- ✅ Always use reCAPTCHA v3 for abuse prevention
- ✅ Validate all input on both client and backend
- ✅ Use HTTPS for all external requests
- ✅ Review Firestore rules regularly for security gaps
- ✅ Enable audit logging for sensitive operations
- ✅ Keep Firebase and dependencies up to date

---

## References

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
