import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANYfhxX6QiJRs8zoNsL_YnlhmAXpLi4-c",
  authDomain: "expense-tracker-b82fb.firebaseapp.com",
  projectId: "expense-tracker-b82fb",
  storageBucket: "expense-tracker-b82fb.firebasestorage.app",
  messagingSenderId: "609989333627",
  appId: "1:609989333627:web:323d724ee14cf8efbb08de",
  measurementId: "G-GGKJ2CCY65"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
