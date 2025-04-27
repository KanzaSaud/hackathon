document.getElementById('leftDiv').textContent = "I'm on the left!";
document.getElementById('rightDiv').textContent = "I'm on the right!";

// Import Firebase App (the core Firebase SDK) and Firebase Auth
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
// Initialize Firebase with your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBfZ_EwYERwTKEb1rLjd-Yf-uFpo0qcrQM",
authDomain: "hackathon-smit-2025.firebaseapp.com",
projectId: "hackathon-smit-2025",
storageBucket: "hackathon-smit-2025.firebasestorage.app",
messagingSenderId: "825161284184",
appId: "1:825161284184:web:148c9d7e86825d6898282d"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign up function
function signUp() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successfully signed up
        console.log("User signed up:", userCredential.user);
        alert("Sign up successful!");
      })
      .catch((error) => {
        // Error occurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  }
  
  // Login function
  function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successfully logged in
        console.log("User logged in:", userCredential.user);
        alert("Login successful!");
      })
      .catch((error) => {
        // Error occurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  }
  