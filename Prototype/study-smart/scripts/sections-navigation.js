//RESPONSIBILITY: LOAD CREATED JSON DATA AND NAVIGATE AS USUAL
//LOAD LATEST SAVE DATA OR START FROM THE BEGINNING
//AT END OF SECTION (WHEN CONT BUTTON PRESSED) SAVE SECTION AS COMPLETED USING SAVE AND LOAD

document.addEventListener('DOMContentLoaded', function() {
    console.log("Dom loaded");
    var jsonData = {}; // initialise json

    //Loads new section to update content
    function updateContent(sectionId) {
        console.log('Lade Sektion:', sectionId);
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

    // Lädt JSON-Daten und setzt den initialen Inhalt
    fetch('../content/sections.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
            updateContent("section01"); // Startet mit der ersten Sektion
        })
        .catch(error => console.error('Error loading JSON data:', error));
}, false);