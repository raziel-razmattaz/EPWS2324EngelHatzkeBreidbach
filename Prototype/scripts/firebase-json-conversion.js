import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
import * as firebase from "../firebase/firebase.js"

//RESPONSIBILITY: RETRIEVE FIRESTORE DATA AND SAVE IT AS A SECTIONS.JSON FILE
//Since our code uses JSON for navigation but firebase for storage, at system start we will need to load and convert our firestore data to JSON for use during the application runtime

function initializeContent() {
    var mostRecentSection = saveAndLoad.getMostRecentSavePoint() || "section01";
    updateContent(mostRecentSection);
}

async function getSection(db){
    const section = collection(db, 'sec')
    console.log(section);
}



/* // Lädt JSON-Daten und setzt den initialen Inhalt
fetch('https://entwicklungsprojekt-ed4aa.firebaseio.com')
    .then(response => response.json())
    .then(data => {
        jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
        console.log(jsonData)
        initializeContent(); // Initialize with the most recent save point or the first section
    })
    .catch(error => console.error('Error loading JSON data:', error)); */