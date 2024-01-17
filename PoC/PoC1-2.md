## Dokumentation POC Fortschritt-Speicherung
### Beschreibung:
Die Nutzende Person bearbeitet einen Teil der Aufgaben und verlässt dann die Session. Der Fortschritt wird bis zum letzten intern festgelegten automatischen Speicherpunkt in Form von Speicherpunkt-IDs über die WebStorage API in localStorage festgehalten.


### Exit-Kriterien:
Der korrekte Stand wird an die API übergeben und in localStorage gespeichert.


### Fail-Kriterien:

1.	localStorage ist nicht verfügbar in dem Browser
2.	Aufgrund von Sicherheitseinstellungen ist localStorage nicht nutzbar
3.	Der Speicher ist voll
4.	Der Stand wird nicht im localStorage gespeichert


### Fallback:

Zu 1. Bei Öffnen der Seite wird überprüft, ob localStorage von dem Browser unterstützt wird. Wenn nicht wird die nutzende Person darauf hingewiesen.

Zu 2. Bei Öffnen der Seite wird über eine initiale Speicherung überprüft, ob die Sicherheitseinstellungen dies zulassen. Wenn nicht wird die nutzende Person darauf hingewiesen und aufgefordert die Sicherheitseinstellungen anzupassen.

Zu 3. Bei Öffnen der Seite wird über eine initiale Speicherung überprüft, ob Speicherplatz verfügbar ist. Ist der Speicher voll, wird die nutzende Person darauf hingewiesen und erhält Hinweise, wie sie dies beheben kann.

Zu 4. Durch catch wird überprüft, ob erfolgreich gespeichert wurde. Ist dies nicht der Fall, wird die nutzende Person benachrichtigt und hat die Option die Speicherung manuell erneut zu versuchen.



# Code



```javascript
// Initialisierung und Überprüfung des localStorage. Fail Kriterium 1 und 2
function init() {
    if (!checkLocalStorage()) {
        alert('localStorage ist in Ihrem Browser nicht verfügbar oder aufgrund von Sicherheitseinstellungen nicht nutzbar. Bitte überprüfen Sie Ihre Browser-Einstellungen.');
        return;
    }

    try {
        localStorage.setItem('test', 'testValue');
        localStorage.removeItem('test');
    } catch (e) {
//Fail Kriterium 3
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
//Fail Kriterium 4
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
