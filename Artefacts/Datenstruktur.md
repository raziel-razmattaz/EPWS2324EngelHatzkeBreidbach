# Datenstrukturen

## JSON-Struktur für die Sektionen

```json
[
    {
        "id": 1,
        "text": "Haben Sie Erfahrung oder Vorwissen zu dem Thema 'Autismus Spektrum Störung'?",
        "options": [
            {
                "text": "Ja",
                "setState": {"Erfahrung": true},
                "nextText": 2,
                "functionName": "handleErfahrungJa"
            },
            {
                "text": "Nein",
                "nextText": 3,
                "functionName": "handleErfahrungNein"
            }
        ]
    },
    {
        "id": 2,
        "text": "In welchen Bereichen haben Sie diese Erfahrung?",
        "options": [
            {
                "text": "Im Freundeskreis",
                "setState": {"Freundeskreis": true},
                "showIf": {"Erfahrung": true},
                "nextText": 3,
                "functionName": "handleFreundeskreis"
            }
            // Weitere Optionen...
        ]
    }
    // Weitere Textknoten...
]
```

### JavaScript-Codebeispiel

```javascript
function handleErfahrungJa() {
    // Logik für die Behandlung der Auswahl "Ja"
}

function handleErfahrungNein() {
    // Logik für die Behandlung der Auswahl "Nein"
}

function handleFreundeskreis() {
    // Logik für die Behandlung der Auswahl "Im Freundeskreis"
}

function callFunctionByName(functionName) {
    if (typeof window[functionName] === "function") {
        window[functionName]();
    }
}

// Beispiel für den Aufruf
const option = {
    "text": "Ja",
    "functionName": "handleErfahrungJa"
};

callFunctionByName(option.functionName);
```
## Fortschrittsdaten und Visualisierung

### Sammeln von Fortschrittsdaten

```javascript
let progressData = [];
function saveProgress(savePointId) {
    let timestamp = new Date(); // Aktuelles Datum und Uhrzeit
    progressData.push({ timestamp: timestamp, savePointId: savePointId });
}
```

Diese Funktion speichert den Fortschritt des Nutzers, indem sie den aktuellen Speicherpunkt zusammen mit einem Zeitstempel in einem Array speichert.

### Zeichnen eines Fortschrittsdiagramms

```javascript
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
```

Mit dieser Funktion wird ein Liniendiagramm erstellt, das den Fortschritt des Nutzers über die Zeit darstellt. Die Idee für ein Liniendiagramm haben wir allerdings schnell wieder verworfen.

### Flussdiagramm mit mermaid.js

```javascript
mermaid.initialize({ startOnLoad: true });
```

```javascript
function createFlowchart() {
    let diagram = 'graph LR
';
    flowchartNodes.forEach(node => {
        node.next.forEach(nextId => {
            diagram += `    ${node.id}("${node.label}") --> ${nextId}
`;
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
```

Dieser Codeabschnitt erstellt ein Flussdiagramm, das verschiedene Entscheidungspfade und Zustände im Nutzererlebnis darstellt.
