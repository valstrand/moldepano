// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC70M9YYtgi0WWjzua6OAr5mX6OPktCo0I",
  authDomain: "moldepano.firebaseapp.com",
  projectId: "moldepano",
  storageBucket: "moldepano.appspot.com",
  messagingSenderId: "41942139320",
  appId: "1:41942139320:web:bcd9c87e05b9f5f3af4f4d",
  measurementId: "G-YDYHHCZNL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
