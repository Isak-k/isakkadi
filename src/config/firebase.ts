/**
 * Firebase client configuration
 * Initialize Firebase App with Web SDK
 * Public configuration only - no secrets here
 */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBmRmNdgM3JFYVzFAtSm9nM6FE6xeWC-E4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'my-portfolio-3253f.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'my-portfolio-3253f',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'my-portfolio-3253f.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '550574974080',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:550574974080:web:587f532bcef98039fe7265',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp)

// Initialize App Check with reCAPTCHA v3 for abuse prevention
// Prevents unauthorized access to Firebase services
declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: string | undefined
}

if (import.meta.env.DEV) {
  // Allow debug token in development (set via console if needed)
  // self.FIREBASE_APPCHECK_DEBUG_TOKEN = 'your_debug_token'
}

// Get reCAPTCHA v3 public key from Firebase Console > App Check
// Register your domain in the reCAPTCHA settings
getAppCheck(firebaseApp).activate(
  new ReCaptchaV3Provider(
    import.meta.env.VITE_RECAPTCHA_V3_PUBLIC_KEY || '6LdtX3opAAAAAFwq4x2x1bBzPZs-K7HPNFmx-XXL' // Placeholder
  ),
  true
)

export default firebaseApp
