import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDsBV8yAA3_aXOTcu1rrT2mAxdAVBGj2CI",
  authDomain: "entwicklungsprojekt-ed4aa.firebaseapp.com",
  projectId: "entwicklungsprojekt-ed4aa",
  storageBucket: "entwicklungsprojekt-ed4aa.appspot.com",
  messagingSenderId: "360784908007",
  appId: "1:360784908007:web:29105387cd210c53f1dc42"

};

initializeApp(firebaseConfig);
var db = getFirestore();

export { db };