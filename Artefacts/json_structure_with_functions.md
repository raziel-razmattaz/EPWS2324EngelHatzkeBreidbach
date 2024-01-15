
# JSON-Struktur mit Funktionsnamen

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

# JavaScript-Codebeispiel

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
