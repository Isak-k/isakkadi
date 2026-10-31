# Firebase Backend Testing Guide

Complete testing procedures for Firebase backend, Firestore security, Cloudinary integration, and Cloud Functions.

## Table of Contents

1. [Local Testing with Firebase Emulator](#local-testing-with-firebase-emulator)
2. [Security Rules Testing](#security-rules-testing)
3. [Data Access Layer Testing](#data-access-layer-testing)
4. [Contact Form Testing](#contact-form-testing)
5. [Cloudinary Integration Testing](#cloudinary-integration-testing)
6. [Production Deployment Testing](#production-deployment-testing)

---

## Local Testing with Firebase Emulator

### Setup

```bash
npm install -g firebase-tools

# Start emulator suite
firebase emulators:start

# In separate terminal, connect to emulator in development
```

In `src/config/firebase.ts`, add emulator connection for development:

```typescript
import { connectFirestoreEmulator } from 'firebase/firestore'

if (import.meta.env.DEV && !db.host.includes('localhost')) {
  connectFirestoreEmulator(db, 'localhost', 8080)
}
```

### Access Emulator UI

- **Firestore UI**: http://localhost:4000/firestore
- **Functions**: http://localhost:5001
- **All services**: http://localhost:4400

---

## Security Rules Testing

### Test 1: Public Can Read Published Projects

```bash
# Using Firebase CLI in emulator environment

# Set auth context to anonymous
firebase emulators:exec '
  const db = firebase.firestore();
  
  // Should succeed - project is published
  const snapshot = await db.collection("projects").doc("boriif-tech").get();
  console.log("✓ Can read published project:", snapshot.exists());
  
  // Should fail - project is draft
  try {
    const draftSnapshot = await db.collection("projects").doc("draft-project").get();
    console.log("✗ ERROR: Should not read draft project");
  } catch (e) {
    console.log("✓ Cannot read draft project (permission denied)");
  }
'
```

### Test 2: Anonymous Users Cannot Write

```javascript
// In browser console
import { db } from '@config/firebase'
import { collection, addDoc } from 'firebase/firestore'

// This should fail
try {
  await addDoc(collection(db, 'projects'), {
    title: 'Hacked Project',
    slug: 'hacked',
  })
  console.error('SECURITY BREACH: Anonymous write succeeded')
} catch (error) {
  console.log('✓ Anonymous write correctly denied:', error.code)
}
```

### Test 3: Contact Messages Direct Write Blocked

```javascript
import { db } from '@config/firebase'
import { collection, addDoc } from 'firebase/firestore'

// Anonymous direct write should fail
try {
  await addDoc(collection(db, 'contactMessages'), {
    name: 'Test',
    email: 'test@example.com',
    message: 'Spam',
  })
  console.error('SECURITY BREACH: Direct contactMessages write succeeded')
} catch (error) {
  console.log('✓ Direct write correctly denied:', error.code)
}
```

### Test 4: Visibility Filtering Works

```javascript
// Skills should only return visible items
import { getVisibleSkills } from '@services/firebase-data-service'

const skills = await getVisibleSkills()
console.log('✓ Retrieved visible skills:', skills.length)

// Verify all have visible: true
const allVisible = skills.every(s => s.visible === true)
console.log('✓ All skills are visible:', allVisible)
```

---

## Data Access Layer Testing

### Test 1: Get Published Projects

```javascript
import { getPublishedProjects } from '@services/firebase-data-service'

const projects = await getPublishedProjects()
console.log('✓ Retrieved projects:', projects.length)

// Verify all are published
const allPublished = projects.every(p => p.publicationStatus === 'published')
console.log('✓ All projects are published:', allPublished)

// Verify ordering
console.log('✓ Projects ordered by displayOrder:', 
  projects.every((p, i, arr) => i === 0 || p.displayOrder >= arr[i-1].displayOrder)
)
```

### Test 2: Get Project by Slug

```javascript
import { getProjectBySlug } from '@services/firebase-data-service'

const project = await getProjectBySlug('boriif-tech')
console.log('✓ Retrieved project by slug:', project?.title)

// Test non-existent slug
const notFound = await getProjectBySlug('does-not-exist')
console.log('✓ Non-existent slug returns null:', notFound === null)
```

### Test 3: Get Featured Projects

```javascript
import { getFeaturedProjects } from '@services/firebase-data-service'

const featured = await getFeaturedProjects()
console.log('✓ Retrieved featured projects:', featured.length)

// Verify all are featured and published
const allFeatured = featured.every(
  p => p.featured === true && p.publicationStatus === 'published'
)
console.log('✓ All are featured and published:', allFeatured)
```

### Test 4: Category Filtering

```javascript
import { getProjectsByCategory } from '@services/firebase-data-service'

const webApps = await getProjectsByCategory('Web App')
console.log('✓ Retrieved Web App projects:', webApps.length)

// Verify all match category
const allWebApps = webApps.every(p => p.category === 'Web App')
console.log('✓ All projects in category:', allWebApps)
```

---

## Contact Form Testing

### Test 1: Validation Works

```javascript
import { validateContactForm } from '@services/contact-service'

// Test missing fields
console.log('Test: missing name')
let error = validateContactForm({
  name: '',
  email: 'test@example.com',
  subject: 'Test',
  message: 'Valid message content'
})
console.log('✓ Caught missing name:', !!error)

// Test invalid email
console.log('\nTest: invalid email')
error = validateContactForm({
  name: 'Test',
  email: 'not-an-email',
  subject: 'Test',
  message: 'Valid message content'
})
console.log('✓ Caught invalid email:', !!error)

// Test message too short
console.log('\nTest: message too short')
error = validateContactForm({
  name: 'Test',
  email: 'test@example.com',
  subject: 'Test',
  message: 'Short'
})
console.log('✓ Caught short message:', !!error)

// Test valid form
console.log('\nTest: valid form')
error = validateContactForm({
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a valid test message for contact form submission.'
})
console.log('✓ Valid form accepted:', !error)
```

### Test 2: Submit Contact Form

```javascript
import { submitContactForm } from '@services/contact-service'

const result = await submitContactForm({
  name: 'Test User',
  email: 'test@user.com',
  subject: 'Test Inquiry',
  message: 'This is a test message to verify the contact form works correctly.'
})

console.log('✓ Submission result:', result)

if (result.success) {
  console.log('✓ Message submitted, ID:', result.messageId)
  
  // Verify in Firestore
  const msg = await db.collection('contactMessages').doc(result.messageId).get()
  console.log('✓ Message persisted in Firestore:', msg.exists())
} else {
  console.log('✗ Submission failed:', result.error)
}
```

### Test 3: Rate Limiting

```javascript
import { submitContactForm } from '@services/contact-service'

// Try to submit 6 messages in quick succession
const results = []
for (let i = 0; i < 6; i++) {
  const result = await submitContactForm({
    name: `Test User ${i}`,
    email: `test${i}@example.com`,
    subject: 'Test',
    message: `Test message number ${i} for rate limit testing.`
  })
  results.push(result)
  console.log(`Attempt ${i + 1}:`, result.success ? '✓ Success' : `✗ ${result.error}`)
}

// First 5 should succeed, 6th should fail with rate limit
const succeeded = results.filter(r => r.success).length
const failed = results.filter(r => !r.success).length
console.log(`\nRate limit test: ${succeeded} succeeded, ${failed} failed`)
console.log('✓ Rate limiting working' + (failed > 0 ? ': Yes' : ': No'))
```

### Test 4: Spam Detection

```javascript
import { submitContactForm } from '@services/contact-service'

// Test spam detection
const spamMessages = [
  {
    name: 'Spammer',
    email: 'spam@example.com',
    subject: 'Buy Viagra Now',
    message: 'Visit our casino at http://fake1.com http://fake2.com http://fake3.com http://fake4.com'
  },
  {
    name: 'Bot',
    email: 'bot@example.com',
    subject: 'Test',
    message: 'aaaaaaaaaaaaaaaaaa (repeated chars)'
  }
]

for (const msg of spamMessages) {
  const result = await submitContactForm(msg)
  console.log('Spam blocked:', !result.success, '-', result.error || result.messageId)
}
```

---

## Cloudinary Integration Testing

### Test 1: File Validation

```javascript
import { validateImageFile } from '@services/cloudinary-upload-service'

// Test valid file
const validFile = new File(['content'], 'image.jpg', { type: 'image/jpeg' })
console.log('✓ Valid file:', !validateImageFile(validFile))

// Test oversized file
const largeFile = new File(
  [new ArrayBuffer(10 * 1024 * 1024)],
  'large.jpg',
  { type: 'image/jpeg' }
)
console.log('✓ Large file rejected:', !!validateImageFile(largeFile))

// Test invalid format
const invalidFile = new File(['content'], 'file.exe', { type: 'application/octet-stream' })
console.log('✓ Invalid format rejected:', !!validateImageFile(invalidFile))
```

### Test 2: Upload Image

```javascript
import { uploadProjectThumbnail } from '@services/cloudinary-upload-service'

// Create test image (1x1 pixel PNG)
const pngData = Uint8Array.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
])
const file = new File([pngData], 'test.png', { type: 'image/png' })

const result = await uploadProjectThumbnail(file, (progress) => {
  console.log(`Upload progress: ${progress.percent.toFixed(0)}%`)
})

if (result.success) {
  console.log('✓ Upload successful')
  console.log('✓ Public ID:', result.image?.publicId)
  console.log('✓ Secure URL:', result.image?.secureUrl)
} else {
  console.log('✗ Upload failed:', result.error)
}
```

### Test 3: Image URL Optimization

```javascript
import { getThumbnailUrl, getGalleryImageUrl } from '@config/cloudinary'

const publicId = 'portfolio/projects/thumbnails/test'

const thumbUrl = getThumbnailUrl(publicId)
console.log('✓ Thumbnail URL:', thumbUrl)
console.log('✓ Contains transformations:', thumbUrl.includes('/w_800') && thumbUrl.includes('/h_600'))

const galleryUrl = getGalleryImageUrl(publicId)
console.log('✓ Gallery URL:', galleryUrl)
console.log('✓ Contains transformations:', galleryUrl.includes('/w_1200') && galleryUrl.includes('/h_800'))
```

---

## Cloud Functions Testing

### Test 1: Contact Function Locally

Start emulator:

```bash
firebase emulators:start
```

Test the function:

```bash
curl -X POST http://localhost:5001/PROJECT_ID/us-central1/submitContactMessage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message for the Cloud Function."
  }'
```

Expected response:

```json
{
  "success": true,
  "messageId": "abc123..."
}
```

### Test 2: Contact Function in Production

After deployment:

```bash
curl -X POST https://us-central1-PROJECT_ID.cloudfunctions.net/submitContactMessage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "production@example.com",
    "subject": "Production Test",
    "message": "Testing Cloud Function in production environment."
  }'
```

Verify in Firebase Console > Firestore > contactMessages collection.

### Test 3: Error Handling

```bash
# Test with invalid email
curl -X POST https://us-central1-PROJECT_ID.cloudfunctions.net/submitContactMessage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "not-an-email",
    "subject": "Test",
    "message": "Valid message content here."
  }'

# Expected: 400 error with "Invalid email format"
```

---

## Production Deployment Testing

### Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] Firestore security rules deployed
- [ ] Cloud Functions deployed and tested
- [ ] Cloudinary upload preset configured
- [ ] Firebase App Check enabled (if using)
- [ ] Backup of current Firestore data (if migrating)

### Deploy to Production

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Cloud Functions
firebase deploy --only functions

# Deploy complete (if using Hosting)
firebase deploy
```

### Smoke Tests After Deployment

1. **Check Firestore Rules**: Open project and verify can read published content
2. **Test Contact Form**: Submit test message and verify in Firestore
3. **Test Cloudinary Upload**: Upload test image and verify in Cloudinary dashboard
4. **Check Function Logs**: View Cloud Function execution logs
5. **Monitor Errors**: Check Firebase Console for any errors or warnings

### Performance Testing

```javascript
// Measure query performance
import { getPublishedProjects } from '@services/firebase-data-service'

const start = performance.now()
const projects = await getPublishedProjects()
const duration = performance.now() - start

console.log(`✓ Query completed in ${duration.toFixed(2)}ms`)
console.log(`✓ Retrieved ${projects.length} projects`)

// Should be < 1000ms for typical queries
console.log(`✓ Performance acceptable: ${duration < 1000 ? 'Yes' : 'No'}`)
```

### Monitoring

Monitor these metrics in Firebase Console:

- **Firestore**: Document read/write counts, latency
- **Cloud Functions**: Execution time, error rates, memory usage
- **Authentication**: User creation/login failures
- **App Check**: Request success rate

---

## Test Results Summary

Document your testing results:

```markdown
## Test Execution Results

### Date: [DATE]
### Environment: [DEV/PROD]

#### Security Rules
- [ ] Public reads: PASS
- [ ] Anonymous writes blocked: PASS
- [ ] Visibility filtering: PASS
- [ ] Rate limiting: PASS

#### Data Access Layer
- [ ] Published projects retrieval: PASS
- [ ] Project by slug: PASS
- [ ] Featured projects: PASS
- [ ] Category filtering: PASS

#### Contact Form
- [ ] Form validation: PASS
- [ ] Successful submission: PASS
- [ ] Rate limiting: PASS
- [ ] Spam detection: PASS

#### Cloudinary
- [ ] File validation: PASS
- [ ] Image upload: PASS
- [ ] URL optimization: PASS
- [ ] Error handling: PASS

#### Cloud Functions
- [ ] Contact submission: PASS
- [ ] Email notification: PASS/NA
- [ ] Error handling: PASS

#### Performance
- [ ] Query latency < 1s: PASS
- [ ] Upload < 30s: PASS
- [ ] Cloud Function < 10s: PASS

### Known Limitations
- None at this time

### Next Steps
- [Optional monitoring recommendations]
```
