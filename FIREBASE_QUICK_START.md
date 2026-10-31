# Firebase Quick Start Guide

Fast-track setup for Firebase backend.

## 5-Minute Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Create project: `isak-kadi-portfolio`
- Create Firestore database in `us-central1` (Production mode)
- Create web app and copy config

### 2. Create Cloudinary Account
- Sign up at [cloudinary.com](https://cloudinary.com)
- Get Cloud Name from Dashboard
- Create upload preset: `portfolio_images` (Unsigned, 5MB max, jpg/png/webp/gif)

### 3. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase and Cloudinary credentials
```

### 4. Deploy Firestore Rules & Functions
```bash
firebase deploy --only firestore:rules
cd functions && npm install && cd ..
firebase deploy --only functions:submitContactMessage
```

### 5. Seed Initial Data
```bash
# Download service account key from Firebase Console
# Save as: service-account-key.json
npx ts-node scripts/seed-firestore-data.ts
```

## Common Tasks

### Test Contact Form Locally
```bash
firebase emulators:start
# In browser console:
import { submitContactForm } from '@services/contact-service'
await submitContactForm({
  name: 'Test', email: 'test@example.com',
  subject: 'Test', message: 'Test message content here.'
})
```

### Upload Test Image
```javascript
import { uploadProjectThumbnail } from '@services/cloudinary-upload-service'
const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
const result = await uploadProjectThumbnail(file)
console.log(result.image?.secureUrl)
```

### Read Published Projects
```javascript
import { getPublishedProjects } from '@services/firebase-data-service'
const projects = await getPublishedProjects()
console.log(projects)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `VITE_FIREBASE_PROJECT_ID is undefined` | Add .env.local with all Firebase credentials |
| Cloudinary upload fails with 401 | Verify upload preset exists and is set to Unsigned |
| Contact form returns 429 | Rate limit working correctly (5 per day per IP/email) |
| Security rules denying access | Ensure rules deployed and fields match query conditions |
| Can't read projects | Verify projects have `publicationStatus: 'published'` |

## Files to Know

- `src/config/firebase.ts` - Firebase initialization
- `src/config/cloudinary.ts` - Cloudinary config & URL builders
- `src/services/firebase-data-service.ts` - Query functions
- `src/services/contact-service.ts` - Contact form logic
- `functions/src/submitContactMessage.ts` - Cloud Function logic
- `firestore.rules` - Security rules
- `.env.example` - Environment template

## Next Steps

1. Read `FIREBASE_SETUP_GUIDE.md` for detailed instructions
2. Run tests in `FIREBASE_TESTING_GUIDE.md`
3. Monitor Firebase Console during early usage
4. Set up email notifications (optional)
5. Plan admin dashboard for next phase

## Support

- Firebase: https://firebase.google.com/docs
- Cloudinary: https://cloudinary.com/documentation
- Contact form Cloud Function: `functions/src/submitContactMessage.ts`
