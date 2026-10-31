# Firebase Integration Checklist

Complete checklist for deploying and integrating the Firebase backend.

## Pre-Deployment Setup (Manual Steps Required)

### Firebase Console Setup
- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Project name: `isak-kadi-portfolio`
- [ ] Enable Firestore Database in `us-central1` (Production mode)
- [ ] Create web app and save configuration
- [ ] Enable App Check > reCAPTCHA v3
- [ ] Enable Authentication > Email/Password (for future admin dashboard)
- [ ] Note your Firebase Config values

### Cloudinary Setup
- [ ] Create Cloudinary account at https://cloudinary.com
- [ ] Copy Cloud Name from Dashboard
- [ ] Go to Settings > Upload
- [ ] Create Upload Preset:
  - Name: `portfolio_images`
  - Unsigned mode: **YES**
  - Allowed extensions: `jpg,jpeg,png,webp,gif`
  - Max file size: `5242880` (5MB)
  - Folder: `portfolio`
  - Resource type: `auto`
- [ ] Copy API Key for later (server-only)

### Local Environment
- [ ] Install Firebase CLI globally: `npm install -g firebase-tools`
- [ ] Run: `firebase login`
- [ ] Create `.env.local` from `.env.example`
- [ ] Fill in all Firebase credentials
- [ ] Fill in all Cloudinary credentials
- [ ] **Verify .env.local is in .gitignore** (do NOT commit!)

## Code Integration (Frontend)

- [ ] Update page imports from `data-service` to `firebase-data-service`:
  ```typescript
  // Change from:
  import { dataService } from '@services/data-service'
  
  // To:
  import { firebaseDataService } from '@services/firebase-data-service'
  ```

- [ ] Verify imports in these files:
  - [ ] `src/pages/Projects.tsx` - Uses `getPublishedProjects()` and `getFeaturedProjects()`
  - [ ] `src/pages/ProjectDetail.tsx` - Uses `getProjectBySlug()`
  - [ ] `src/pages/Skills.tsx` - Uses `getVisibleSkills()`
  - [ ] `src/pages/About.tsx` - Uses `getVisibleEducation()` if implemented

- [ ] Update `src/pages/Contact.tsx` to use contact form service:
  ```typescript
  import { submitContactForm, validateContactForm } from '@services/contact-service'
  
  // Implement form submission with error/success states
  ```

## Deployment (Firebase CLI)

### Step 1: Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```
- [ ] Verify in Firebase Console > Firestore > Rules
- [ ] Test: Try reading unpublished project (should fail)

### Step 2: Deploy Cloud Functions
```bash
cd functions
npm install
cd ..
firebase deploy --only functions:submitContactMessage
```
- [ ] Check function URL from output
- [ ] Add to `.env.local`:
  ```env
  VITE_CONTACT_FUNCTION_URL=<URL from output>/submitContactMessage
  ```

### Step 3: Seed Initial Data
```bash
# Download service account key from Firebase Console
# Project Settings > Service Accounts > Generate new private key
# Save as: service-account-key.json (in project root)

npx ts-node scripts/seed-firestore-data.ts
```
- [ ] Verify in Firebase Console > Firestore > projects collection
- [ ] Should see 4 projects: Boriif Tech, Examino Pro, AgroGuard AI, RedFox Tech
- [ ] Check that all have `publicationStatus: 'published'`

### Step 4: Deploy Hosting (Optional)
```bash
npm run build
firebase deploy --only hosting
```
- [ ] Test live URL at `https://your-project.web.app`

## Testing (Post-Deployment)

### Security Tests
- [ ] Try reading published project in browser console ✅ Should work
- [ ] Try reading unpublished project ✅ Should fail
- [ ] Try writing directly to Firestore ✅ Should fail
- [ ] Try submitting contact form ✅ Should work

### Data Tests
- [ ] Projects page loads with Firestore data ✅
- [ ] Project detail page loads by slug ✅
- [ ] Featured projects display correctly ✅
- [ ] Skills page loads with visible skills ✅

### Contact Form Tests
- [ ] Submit valid form ✅
- [ ] Verify message in Firestore contactMessages ✅
- [ ] Test form validation (missing fields) ✅
- [ ] Test email validation ✅
- [ ] Try rate limit (5+ submissions) ✅

### Image Upload Tests
- [ ] Upload test image to Cloudinary ✅
- [ ] Verify image appears in Cloudinary dashboard ✅
- [ ] Verify secure_url and public_id saved ✅

## Production Readiness

### Security
- [ ] Review Firestore rules one more time
- [ ] Enable App Check enforcement in Firebase Console
- [ ] Set reCAPTCHA v3 public key in environment
- [ ] Remove debug tokens from code
- [ ] Verify no secrets in frontend code

### Monitoring
- [ ] Set up Firebase Console alerts (optional)
- [ ] Create Cloudinary usage alerts (optional)
- [ ] Document how to view Cloud Function logs
- [ ] Plan backup strategy for Firestore

### Documentation
- [ ] Update project README with backend info ✅
- [ ] Share `FIREBASE_SETUP_GUIDE.md` with team
- [ ] Share `FIREBASE_TESTING_GUIDE.md` with QA
- [ ] Document admin dashboard readiness for future phase

## Environment Variables Verification

```bash
# Verify all required env vars are set:
grep -E "VITE_|functions/.env" .env.local | sort

# Should include:
# VITE_FIREBASE_API_KEY
# VITE_FIREBASE_AUTH_DOMAIN
# VITE_FIREBASE_PROJECT_ID
# VITE_FIREBASE_STORAGE_BUCKET
# VITE_FIREBASE_MESSAGING_SENDER_ID
# VITE_FIREBASE_APP_ID
# VITE_RECAPTCHA_V3_PUBLIC_KEY
# VITE_CLOUDINARY_CLOUD_NAME
# VITE_CLOUDINARY_UPLOAD_PRESET
# VITE_CONTACT_FUNCTION_URL
```

## Post-Deployment Monitoring

### Week 1
- [ ] Monitor Firestore read/write counts
- [ ] Check Cloud Function execution times
- [ ] Review contact messages for spam
- [ ] Monitor Cloudinary upload usage

### Month 1
- [ ] Analyze query performance
- [ ] Check error rates and logs
- [ ] Verify spam detection is working
- [ ] Assess cost usage

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Permission denied" on Firestore reads | Verify rules deployed and project status is 'published' |
| Cloud Function returns 404 | Check function URL in .env.local matches deployed URL |
| Cloudinary upload fails | Verify upload preset is Unsigned and allows required formats |
| Contact form returns 429 | Rate limiting is working correctly (wait 24 hours) |
| Images not displaying | Verify Cloudinary Image URLs are https and public_id is correct |

## Rollback Plan

If deployment encounters issues:

1. **Revert Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules  # Redeploy previous rules
   ```

2. **Disable Cloud Functions**
   - Go to Firebase Console > Functions
   - Click function > More > Delete or disable

3. **Clear Firestore Data** (if needed)
   - Firebase Console > Firestore > Delete collection
   - Or restore from backup

4. **Downgrade .env.local**
   - Revert to working environment variables
   - Redeploy frontend

## Sign-Off

- [ ] All checklist items completed
- [ ] All tests passing
- [ ] Documentation reviewed and shared
- [ ] Team trained on backend workflow
- [ ] Ready for production use

---

**Deployment Date**: _______________  
**Deployed By**: _______________  
**Tested By**: _______________  
**Approved By**: _______________
