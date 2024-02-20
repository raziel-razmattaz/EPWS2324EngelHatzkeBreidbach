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

/*
This section is for uploading our sections.json content into the db!!!

const admin = require("./firebase-admin")
const serviceAccount = require ("./service-key.json");

const data = require("./sections.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://entwicklungsprojekt-ed4aa.firebaseio.com"
});


function isCollection(data, path, depth) {
    if (
        typeof data != 'object' ||
        data == null ||
        data.length === 0 ||
        isEmpty(data)
    ) {
        return false;
    }

    for (const key in data) {
        if (typeof data[key] != 'object' || data[key] == null) {
            // If there is at least one non-object item in the data then it cannot be collection.
            return false;
        }
    }

    return true;
}

// Checks if object is empty.
function isEmpty(obj) {
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

async function upload(data, path) {
    return await admin.firestore()
        .doc(path.join('/'))
        .set(data)
        .then(() => console.log(`Document ${path.join('/')} uploaded.`))
        .catch(() => console.error(`Could not write document ${path.join('/')}.`));
}

async function resolve(data, path = []) {
    if (path.length > 0 && path.length % 2 == 0) {
        // Document's length of path is always even, however, one of keys can actually be a collection.

        // Copy an object.
        const documentData = Object.assign({}, data);

        for (const key in data) {
            // Resolve each collection and remove it from document data.
            if (isCollection(data[key], [...path, key])) {
                // Remove a collection from the document data.
                delete documentData[key];
                // Resolve a colleciton.
                resolve(data[key], [...path, key]);
            }
        }

        // If document is empty then it means it only consisted of collections.
        if (!isEmpty(documentData)) {
            // Upload a document free of collections.
            await upload(documentData, path);
        }
    } else {
        // Collection's length of is always odd.
        for (const key in data) {
            // Resolve each collection.
            await resolve(data[key], [...path, key]);
        }
    }
}

resolve(data);

 */
