
// Initialisierung und Überprüfung des localStorage
    function init() {
        if (!checkLocalStorage()) {
            alert('localStorage ist in Ihrem Browser nicht verfügbar oder aufgrund von Sicherheitseinstellungen nicht nutzbar. Bitte überprüfen Sie Ihre Browser-Einstellungen.');
            return;
        }

        try {
            localStorage.setItem('test', 'testValue');
            localStorage.removeItem('test');
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Der Speicherplatz für localStorage ist voll. Bitte räumen Sie Speicher frei.');
            } else {
                alert('Ein Fehler ist aufgetreten: ' + e.message);
            }
        }
    }

init();

// Array to hold all save points
    export let savePoints = [];

// Call this function to initialize save points from localStorage
    export function loadSavePoints() {
        const savedData = localStorage.getItem('savePoints');
        savePoints = savedData ? JSON.parse(savedData) : [];
        // Sort the save points by timestamp in descending order
        savePoints.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        if (savedData) {
            console.log('Speicherpunkte: ' + savePoints);
            return savedData;
        } else {
            console.log('Keine Speicherpunkte gefunden.');
            return null;
        }
    }

// Function to add a new save point and save it to localStorage
    export function addSavePoint(sectionId) {
        // Create a new save point with a timestamp
        const newSavePoint = {
            id: sectionId,
            timestamp: new Date().toISOString() // ISO string includes date and time
        };

        // Add the new save point to the array
        savePoints.push(newSavePoint);

        // Save the updated array to localStorage
        try {
            localStorage.setItem('savePoints', JSON.stringify(savePoints));
        } catch (e) {
            alert('Fehler beim Speichern des Speicherpunkts: ' + e.message + '. Bitte versuchen Sie es erneut.');
        }
    }

    // Function to get the most recent save point
    export function getMostRecentSavePoint() {
        var savePoints = JSON.parse(localStorage.getItem('savePoints') || '[]');
        // Sort the save points by timestamp in descending order
        savePoints.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return savePoints.length > 0 ? savePoints[0].id : null;
    }





