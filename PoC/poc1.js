// Prüfen, ob localStorage verfügbar und nutzbar ist
function checkLocalStorage() {
    try {
        localStorage.setItem('test', 'testValue');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
}

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

// Funktion, um den Speicherpunkt zu setzen und zu überprüfen, ob er erfolgreich gespeichert wurde
function setSavePoint(savePointId) {
    try {
        localStorage.setItem('lastSavePoint', savePointId);
        if (localStorage.getItem('lastSavePoint') === savePointId) {
            console.log('Speicherpunkt gesetzt: ' + savePointId);
        } else {
            throw new Error('Speicherpunkt konnte nicht gesetzt werden.');
        }
    } catch (e) {
        alert('Fehler beim Speichern des Speicherpunkts: ' + e.message + '. Bitte versuchen Sie es erneut.');
    }
}

// Funktion, um den letzten Speicherpunkt abzurufen
function getLastSavePoint() {
    const lastSavePoint = localStorage.getItem('lastSavePoint');
    if (lastSavePoint) {
        console.log('Letzter Speicherpunkt: ' + lastSavePoint);
        return lastSavePoint;
    } else {
        console.log('Kein Speicherpunkt gefunden.');
        return null;
    }
}

// Initialisierung bei Laden der Seite
init();

// Beispiel: Speicherpunkt setzen
setSavePoint('S-123');

// Beispiel: Letzten Speicherpunkt abrufen
getLastSavePoint();

let progressData = [];
function saveProgress(savePointId) {
    let timestamp = new Date(); // Aktuelles Datum und Uhrzeit
    progressData.push({ timestamp: timestamp, savePointId: savePointId });
}

function drawProgressChart() {
    let ctx = document.getElementById('progressChart').getContext('2d');
    let labels = progressData.map(data => data.timestamp.toLocaleString());
    let dataPoints = progressData.map(data => data.savePoint);

    new Chart(ctx, {
        type: 'line', // Oder ein anderer Diagrammtyp nach Wunsch
        data: {
            labels: labels,
            datasets: [{
                label: 'Fortschritt',
                data: dataPoints,
                // Weitere Konfigurationen für das Aussehen des Diagramms
            }]
        }
    });
}

mermaid.initialize({ startOnLoad: true });


function createFlowchart() {
    let diagram = 'graph LR\n';
    flowchartNodes.forEach(node => {
        node.next.forEach(nextId => {
            diagram += `    ${node.id}("${node.label}") --> ${nextId}\n`;
        });
    });

    document.getElementById('flowchart').innerHTML = diagram;
    mermaid.init(undefined, document.getElementById('flowchart'));
}

const flowchartNodes = [
    { id: 1, label: 'Start', next: [2] },
    { id: 2, label: 'Erfahrung mit Autismus?', next: [3, 4] },
    { id: 3, label: 'Ja', next: [5] },
    { id: 4, label: 'Nein', next: [5] },
    { id: 5, label: 'Ende', next: [] }
];

createFlowchart();


