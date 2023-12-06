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



## Dokumentation POC Speicherung auswahlbeschränkter *Flavour Choices* des Nutzenden
### Beschreibung:
Um das Lernerlebnis attraktiver und persönlicher zu gestalten, werden einige Angaben des Nutzenden gespeichert (keine Risiko-behafteten Informationen) um im späteren Verlauf darauf Bezug nehmen zu können. Hierfür können aus werden die Antworten jeweils als einzelne Variablen in den localStorage gelegt. 

### Exit-Kriterien:
Die Nutzende Person hat erfolgreich eine Auswahl getroffen und die Auswahl wird unter der korrekten Variable erfolgreich gespeichert.

### Fail-Kriterien:

1.	Die Eingabe des Nutzenden unvollständig/nicht erfolgt.
2.	Das Speichern der Daten schlägt fehl.

### Fallback:

Zu 1.: Die nutzende Person wird aufgefordert die Eingabe zu überprüfen und zu verbessern.

Zu 2.: Der nutzenden Person wird eine Fehlermeldung ausgegeben und sie wird dazu aufgefordert den Vorgang zu wiederholen.



## Dokumentation POC Speicherung von Freitext *Flavour Choices* des Nutzenden
### Beschreibung:

Um das Lernerlebnis attraktiver und persönlicher zu gestalten, werden einige Angaben des Nutzenden gespeichert (keine Risiko-behafteten Informationen) um im späteren Verlauf darauf Bezug nehmen zu können. Um sie später weiter verwenden zu können, besitzen die Eingabefelder Eingabekontrollen bzw. Vorgaben, wie die Eingabe auszusehen hat. Die eingegebenen Antworten werden dann jeweils unter einzelne Variablen in den localStorage gelegt. 

### Exit-Kriterien:

Die Nutzende Person hat eine korrekte Eingabe getätigt und die Auswahl wird unter der korrekten Variable erfolgreich gespeichert.

### Fail-Kriterien:

1.	Die Eingabe des Nutzenden unvollständig oder inkorrekt.
2.	Das Speichern der Daten schlägt fehl.

### Fallback:

Zu 1.: Die nutzende Person wird aufgefordert die Eingabe zu überprüfen und zu verbessern.

Zu 2.: Der nutzenden Person wird eine Fehlermeldung ausgegeben und sie wird dazu aufgefordert den Vorgang zu wiederholen.
