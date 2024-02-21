import { db } from "../firebase/firebase-setup.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Async function to get documents from a collection
async function getMyCollection() {
    console.log("yay");
    var toGet = "section" + "01"; //so we can cycle through
    const querySnapshot = await getDocs(collection(db, toGet));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
}

// Call the function
getMyCollection();