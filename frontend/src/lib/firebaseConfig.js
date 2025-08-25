// Firebase core and services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your Firebase config (use environment variables in production)
const firebaseConfig = {
  apiKey: "AIzaSyC2RYPELnxqjlSGcFCXhBpzzy6EuhKBEik",
  authDomain: "expense-tracker-d3bae.firebaseapp.com",
  projectId: "expense-tracker-d3bae",
  storageBucket: "expense-tracker-d3bae.firebasestorage.app",
  messagingSenderId: "438932731452",
  appId: "1:438932731452:web:a98f14813e5d66906d7539",
  measurementId: "G-KES4JYQZN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

export default app;
