import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBKlPvgI5xZzHoPhCeHnu6RdAAO93R0mI",
  authDomain: "project-now-bf41b.firebaseapp.com",
  projectId: "project-now-bf41b",
  storageBucket: "project-now-bf41b.appspot.com",
  messagingSenderId: "574382162816",
  appId: "1:574382162816:web:e665487d9696ae2bfaf765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);