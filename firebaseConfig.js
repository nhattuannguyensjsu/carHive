// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEqQ7efiO4x8CHongQ9d6QUK61NA9Pffc",
  authDomain: "carhive-c993a.firebaseapp.com",
  projectId: "carhive-c993a",
  storageBucket: "carhive-c993a.appspot.com",
  messagingSenderId: "243869331343",
  appId: "1:243869331343:web:263360395eba7f682a25fa"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

