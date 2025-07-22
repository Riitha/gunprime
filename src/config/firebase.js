// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqeEd1wW0yBcI6m8jgVdc-ujJTZcUohC8",
  authDomain: "gunpuraimu.firebaseapp.com",
  projectId: "gunpuraimu",
  storageBucket: "gunpuraimu.firebasestorage.app",
  messagingSenderId: "5935219321",
  appId: "1:5935219321:web:af023df3c470a90baf4aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();