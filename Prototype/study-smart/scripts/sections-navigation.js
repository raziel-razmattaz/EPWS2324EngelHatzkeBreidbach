//RESPONSIBILITY: LOAD CREATED JSON DATA AND NAVIGATE AS USUAL
//LOAD LATEST SAVE DATA OR START FROM THE BEGINNING
//AT END OF SECTION (WHEN CONT BUTTON PRESSED) SAVE SECTION AS COMPLETED USING SAVE AND LOAD

import { getContent, getHeader, getChoices } from "../scripts/firebase-test.js";

document.addEventListener('DOMContentLoaded', function() {
    var jsonData = {}; // initialise json

    function initSection() {
        //LATER: call loadSaveData() and work with that for the first section
        var continueDiv = document.getElementById("section-continue");
        continueDiv.innerHTML = '';
        updateHeader("section01");
        updateContent("section01");
        updateChoices("section10", continueDiv);
    }
    
    // Lädt JSON-Daten und setzt den initialen Inhalt
    fetch('../content/sections.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
            initSection(); // Startet mit der ersten Sektion
        })
        .catch(error => console.error('Error loading JSON data:', error));
}, false);

export function updateSection(sectionId) {
    console.log('Lade Sektion:', sectionId);
    //remove the old buttons
    updateHeader(sectionId);
    updateContent(sectionId);
    updateChoices(sectionId);
}


async function updateContent(sectionId) {
    try {
        const content = await getContent(sectionId);
        document.getElementById("section-content").innerHTML = content || "<p>Standardinhalt</p>";
    } catch (error) {
        console.error("Error fetching content:", error);
    }
}

async function updateHeader(sectionId) {
    try {
        const header = await getHeader(sectionId);
        if(header) {
            document.getElementById("section-header").innerHTML = header;
        }
    } catch (error) {
        console.error("Error fetching header:", error);
    }
}

async function updateChoices(sectionId) {
    //Create between 1-4 Buttons, depending on the choices
    //if there is only one button, no custom text will be used
    try {
        var continueDiv = document.getElementById("section-continue");
        continueDiv.innerHTML = '';
        const choices = await getChoices(sectionId);
        console.log(choices.length);
        if (choices.length > 1) {
            choices.forEach(choice => {
                var button = document.createElement("button");
                button.textContent = choice[1];
                button.classList.add("section-continue-custom");
                button.setAttribute('data-section', choice[0]);
                button.addEventListener('click', function() {
                    updateContent(this.getAttribute('data-section'));
                });
                continueDiv.appendChild(button);
            });
          } else {
            var button = document.createElement("button");
            button.textContent = "";
            button.classList.add("section-continue-default");
            button.setAttribute('data-section', choices[0][0]);
            button.addEventListener('click', () => {
                updateSection(button.getAttribute('data-section'));
            });
            continueDiv.appendChild(button);
          }
    } catch (error) {
        console.error("Error fetching choices:", error);
    }
}