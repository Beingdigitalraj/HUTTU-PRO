import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// आपके HUTTU-PRO प्रोजेक्ट का कॉन्फ़िगरेशन
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // इसे Firebase Console -> Project Settings से बदलें
  authDomain: "huttu-pro.firebaseapp.com",
  projectId: "huttu-pro",
  storageBucket: "huttu-pro.firebasestorage.app",
  messagingSenderId: "310530803979",
  appId: "YOUR_APP_ID",   // इसे Firebase Console से बदलें
  measurementId: "G-XXXXXXXXXX" // आपकी Analytics Property ID के अनुसार
};

// Firebase को इनिशियलाइज़ करें
const app = initializeApp(firebaseConfig);

// सर्विसेज़ को एक्सपोर्ट करें
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
