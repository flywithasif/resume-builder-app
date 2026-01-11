// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCvy6DMBUkeObuUkJoHx48csi_aUK-WpSc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "resume-builder-app-36046.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "resume-builder-app-36046",
  // IMPORTANT: bucket domain is *.appspot.com (not firebasestorage.app)
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "resume-builder-app-36046.appspot.com",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:259640885999:web:b53b3a7e02b5130a1e111a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Auth persistence failed; continuing without persistent session.", err?.code || err);
});

export const googleProvider = new GoogleAuthProvider();
// Optional: force account chooser
// googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
