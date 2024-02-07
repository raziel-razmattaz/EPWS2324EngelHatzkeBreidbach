document.addEventListener("DOMContentLoaded", function() {
    var jsonData = {}; // Initialisiere jsonData

    // Funktion zum Aktualisieren des Inhalts basierend auf der Sektions-ID
    function updateContent(sectionId) {
        console.log('Lade Sektion:', sectionId);
        var data = jsonData[sectionId];
        if (!data) {
            console.error('Sektion nicht gefunden:', sectionId);
            return;
        }

        document.getElementById("section-header").textContent = data.header || "Standardüberschrift";
        document.getElementById("section-content").innerHTML = data.content || "<p>Standardinhalt</p>";

        // Entferne vorherige Buttons
        var continueDiv = document.getElementById("section-continue");
        continueDiv.innerHTML = '';

        // Erstelle einen neuen Button für jede Wahlmöglichkeit in den JSON-Daten, wenn vorhanden
        if(data.choices) {
            data.choices.forEach(function(choice) {
                var button = document.createElement("button");
                button.textContent = choice.text;
                button.classList.add("section-continue-custom");
                button.setAttribute('data-section', choice.jump);
                button.addEventListener('click', function() {
                    updateContent(this.getAttribute('data-section'));
                });
                continueDiv.appendChild(button);
            });
        }
    }

    // Lädt JSON-Daten und setzt den initialen Inhalt
    fetch('../learning-game/Sektionen/sections.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Speichert die geladenen JSON-Daten in `jsonData`
            updateContent("section01"); // Startet mit der ersten Sektion
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
