// 1. Import Firebase Functions (Using CDN links for GitHub compatibility)
import { initializeApp } from "https://gstatic.com";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://gstatic.com";

// 2. Your PolyBlox2 Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNIGa8rJQCLZp0AyosayFL-l4jWklyagU",
  authDomain: "polyblox2.firebaseapp.com",
  projectId: "polyblox2",
  storageBucket: "polyblox2.firebasestorage.app",
  messagingSenderId: "844864509875",
  appId: "1:844864509875:web:786ed59b0b6340a5995dc6",
  measurementId: "G-0W9QRGNHKR"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Select HTML Elements
const emailInput = document.getElementById('email-field');
const passInput = document.getElementById('pass-field');
const statusMsg = document.getElementById('status-msg');

// 5. SIGN UP LOGIC
document.getElementById('signup-btn').onclick = () => {
    const email = emailInput.value;
    const pass = passInput.value;

    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        statusMsg.style.color = "#00ff00";
        statusMsg.innerText = "Account Created! You are logged in.";
    })
    .catch((error) => {
        statusMsg.style.color = "#ff5f5f";
        if (error.code === 'auth/email-already-in-use') {
            statusMsg.innerText = "That account already exists!";
        } else {
            statusMsg.innerText = error.message;
        }
    });
};

// 6. LOGIN LOGIC
document.getElementById('login-btn').onclick = () => {
    const email = emailInput.value;
    const pass = passInput.value;

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        statusMsg.style.color = "#00ff00";
        statusMsg.innerText = "Success! Entering game...";
        // Optional: window.location.href = "game.html"; 
    })
    .catch((error) => {
        statusMsg.style.color = "#ff5f5f";
        statusMsg.innerText = "Wrong email or password.";
    });
};

// 7. CHECK SESSION (Keeps you logged in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        statusMsg.style.color = "#00ff00";
        statusMsg.innerText = "Current Session: " + user.email;
    }
});
