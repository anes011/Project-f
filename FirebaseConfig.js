import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHxU8V1fYRbomIk6hvx6xD0R-cO_0Y_bg",
  authDomain: "now-p-224b3.firebaseapp.com",
  projectId: "now-p-224b3",
  storageBucket: "now-p-224b3.appspot.com",
  messagingSenderId: "1024302453340",
  appId: "1:1024302453340:web:8ee18330847c6c94a44c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);