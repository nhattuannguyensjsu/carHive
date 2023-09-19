// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB745xCKUfaKWFyrTYiZ_F_6ThGd4QOJCM",
    authDomain: "carhive-2d4d3.firebaseapp.com",
    databaseURL: "https://carhive-2d4d3-default-rtdb.firebaseio.com",
    projectId: "carhive-2d4d3",
    storageBucket: "carhive-2d4d3.appspot.com",
    messagingSenderId: "269589515695",
    appId: "1:269589515695:web:74e38aa014240833b6735a"
};



// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
