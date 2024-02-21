import * as saveAndLoad from "./save-and-load.js"
import { } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
import * as firebase from "../firebase/firebase.js"

/*
savesection = addsavepoint -> in localstorage mit id von firebase
update content: infos von firebase laden
initialize content: recent savepoint von localstorage mit id(default section01)
                            -> abruf content von firebase
 */

document.addEventListener("DOMContentLoaded", function () {
    if (!saveAndLoad.checkLocalStorage()) {
        return alert('localStorage ist in Ihrem Browser nicht verfügbar oder aufgrund von Sicherheitseinstellungen nicht nutzbar. Bitte überprüfen Sie Ihre Browser-Einstellungen.');
    }
    let jsonData = {}; // initialise json

    // Function to be called every time a new section is entered
    function saveSection(sectionId) {
        // Add a new save point with the current timestamp
        saveAndLoad.addSavePoint(sectionId);
    }

    //Loads new section to update content
    function updateContent(sectionId) {
        console.log('Lade Sektion:', sectionId);
        saveSection(sectionId); // Set a save point whenever a new section is loaded
        var data = jsonData[sectionId];
        if (!data) {
            console.error('Sektion nicht gefunden:', sectionId);
            return;
        }

        //Only Update the section header and image if new data is in the section
        if (data.header) {
            document.getElementById("section-header").textContent = data.header
        }

        //placeholder until all sections get content!!
        document.getElementById("section-content").innerHTML = data.content || "<p>Standardinhalt</p>";

        //Delete all previous buttons
        var continueDiv = document.getElementById("section-continue");
        continueDiv.innerHTML = '';

        //Create between 1-4 Buttons, depending on the choices
        //if there is only one button, no custom text will be used
        if (data.choices.length > 1) {
            data.choices.forEach(choice => {
                var button = document.createElement("button");
                button.textContent = choice.text;
                button.classList.add("section-continue-custom");
                button.setAttribute('data-section', choice.jump);
                button.addEventListener('click', function () {
                    updateContent(this.getAttribute('data-section'));
                });
                continueDiv.appendChild(button);
            });
        } else {
            var button = document.createElement("button");
            button.textContent = "";
            button.classList.add("section-continue-default");
            button.setAttribute('data-section', data.choices[0].jump);
            button.addEventListener('click', function () {
                updateContent(this.getAttribute('data-section'));
            });
            continueDiv.appendChild(button);
        }
    }

    // Function to initialize the content with the most recent save point or default section
    function initializeContent() {
        var mostRecentSection = saveAndLoad.getMostRecentSavePoint() || "section01";
        updateContent(mostRecentSection);
    }

    async function getSection(db){
        const section = collection(db, 'sec')
    }

    // Lädt JSON-Daten und setzt den initialen Inhalt
    fetch('https://entwicklungsprojekt-ed4aa.firebaseio.com')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
            console.log(jsonData)
            initializeContent(); // Initialize with the most recent save point or the first section
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;

/*
suspend fun checkNonEdibility(product: Product): Boolean {
    return getUserPreferences(getUser()!!).any{
        val preference = preferencesList[it.preferenceName]
        preference!!.third.invoke(product)
    }
}

suspend fun getUserPreferences(email: String): List<Preference> {
    return db.collection(PREFERENCES_COLLECTION).whereEqualTo("userEmail",email).get().await().toObjects()
}
*/





