import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Ключи должны быть прокинуты через NEXT_PUBLIC_ в Vercel
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Инициализируем app, db и auth как let
let app;
let auth;
let db;

// !!! КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Инициализируем Firebase ТОЛЬКО в браузере. !!!
if (typeof window !== 'undefined') {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app); 
  } catch (error) {
    // В случае ошибки (например, уже инициализирован)
    console.error("Firebase initialization error on client:", error);
  }
}

// Экспортируем то, что было инициализировано (на сервере будет undefined, на клиенте - объекты)
export { auth, db };
export default app;