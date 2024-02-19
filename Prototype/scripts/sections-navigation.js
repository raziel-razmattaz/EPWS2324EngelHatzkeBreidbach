let saveAndLoad = require("./save-and-load.js");

document.addEventListener("DOMContentLoaded", function() {
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
                button.addEventListener('click', function() {
                    updateContent(this.getAttribute('data-section'));
                });
                continueDiv.appendChild(button);
            });
          } else {
            var button = document.createElement("button");
            button.textContent = "";
            button.classList.add("section-continue-default");
            button.setAttribute('data-section', data.choices[0].jump);
            button.addEventListener('click', function() {
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

    // Lädt JSON-Daten und setzt den initialen Inhalt
    fetch('../content/sections.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
            initializeContent(); // Initialize with the most recent save point or the first section
        })
        .catch(error => console.error('Error loading JSON data:', error));
});





