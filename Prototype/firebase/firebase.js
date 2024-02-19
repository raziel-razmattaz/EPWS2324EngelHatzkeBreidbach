// Import the functions you need from the SDKs you need
var {initializeApp} = require ("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//für the actual DB
var {getFirestore} = require ("firebase/firestore");

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

const admin = require("/firebase-admin")
const serviceAccount = require ("./service-key.json");

const data = require("./content/sections.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://entwicklungsprojekt-ed4aa.firebaseio.com"
});

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    }
});