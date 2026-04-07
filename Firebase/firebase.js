// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEL4Gedbqne1uxEo6esjrfq192wSA_Vf4",
  authDomain: "roblox-ff098.firebaseapp.com",
  projectId: "roblox-ff098",
  storageBucket: "roblox-ff098.firebasestorage.app",
  messagingSenderId: "934102556891",
  appId: "1:934102556891:web:d48165c81c51101e80ecfe",
  measurementId: "G-ZWZVHD312C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
