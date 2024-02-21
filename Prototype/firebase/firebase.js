// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsBV8yAA3_aXOTcu1rrT2mAxdAVBGj2CI",
    authDomain: "entwicklungsprojekt-ed4aa.firebaseapp.com",
    projectId: "entwicklungsprojekt-ed4aa",
    storageBucket: "entwicklungsprojekt-ed4aa.appspot.com",
    messagingSenderId: "360784908007",
    appId: "1:360784908007:web:29105387cd210c53f1dc42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
var test = db.collection("sec");
console.log(test);