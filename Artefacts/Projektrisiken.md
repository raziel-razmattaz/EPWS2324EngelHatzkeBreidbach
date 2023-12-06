## Projektrisiken

### Architekturiell/Technisch

#### Struktur der Lehreinheiten
- *Wie soll mit der Entwicklung von nicht-linearen Inhalten umgegangen werden?* Die Nicht-Linearität des Systems unterstützt zwar die individuelle User-Journey, ist allerdings auch umständlich zu entwickeln. Es besteht das Risiko sich zu verhedern, Fehler zu übersehen, Inhalte zu doppeln oder zu vergessen. Um dieses Risiko zu minimieren, sollten während der Entwicklung auführliche Diagramme und Organisationsdokumente gepflegt und referenziert werden.

#### Datensicherheit & Privatschutz
- *Welche User Daten müssen wie lange wo gespeichert werden?* Benutzerdaten sind potentielle Risiken im Bereich Privatsschutz und Datensicherheit. Für das System müssen aber keine identifizierenden oder sensiblen Daten gespeichert werden. Um Probleme zu vermeiden, sollten personenbezogene Daten auf ein Minimum reduziert, sowie im Sinne der DSGVO behandelt werden.

#### Analyse des Benutzer-Fortschritts
- *Wie wird der Fortschritt der Nutzer dargestellt?* Da das Lernverfahren Non-Linear stattfinden soll, müssen die abgearbeiteten Sektionen und ihre Resultate gespeichert und über einen Algorithmus ausgewertet werden um es anschaulich darzustellen. Bei dem Lösungsansatz handelt es sich bei dem Fortschrittsdisplay um eine Art Baumstruktur, die rekursiv abgearbeitet wird. Das Zusammenspiel von Graphik und individuellen User-Daten ist wichtig um den gamifizierten Aspekt des Systems zu unterstützen. Zum Testen dieses Algorithmus, würde sich ein Proof-of-Concept anbieten.

#### Platformkompabilität
- *Welche Platformkompabilität kann und muss gesichert werden?* Verschiedene Arbeitsplätze nutzen verschiedene Betriebsysteme, wie macOS oder Windows11, auf ihren Arbeitscomputern. Wir das System also nur für ein Betriebssystem entwickelt, könnten große Teile der potentiellen Nutzergruppe wegfallen. Die Entwicklung für mehrere Betriebsysteme benötigt auch passende Hardware (im Falle von macOS) um die Anwendung genügend zu testen. Um eine möglichst hohe Kompabilität zu sichern, wird das Projekt also als Web-App entwickelt. Eine Web-App kann ohne Installationsaufwand genutzt werden. Betriebssystem-abhängige Probleme werden so stark vermindert.

---

### Sozial

#### Nutzungsmotivation
- *Besteht genug persönliche Nutzungsmotivation?* Insbesondere wenn Teil eines betrieblichen Toleranztrainings, wird Schulungsmaterial oft nicht ernst genommen; das führt auch zu unzureichende Belehrung der Nutzer. Deshalb ist es wichtig, bei der Entwicklung anreizende Aspekte der Gamification zu integrieren. Das Interesse am Thema kann so nicht bei dem Benutzer geschaffen werden, aber so kann dennoch genug Fokus gesichert werden um etwas mitzunehmen.

---

### Inhaltlich

#### Verständniss
- *Wird das Material auf anschauliche und verständliche Weise vermittelt?* Es besteht das Risiko, das Nutzer falsche (möglicherwiese sogar negative) Schlüße aus dem Schulungsmaterial ziehen. Wird also tatsächlich das vermittelt, was vermittelt werden soll? Diese Risiken können nicht behoben werden, sondern nur durch eigenes Fachwissen vermindert und durch User Testing möglichst behoben werden.

#### Lernerfolg

- *Wird sich inhaltlich auf die richtigen Aspekte fokusiert?* Lernen die Benutzer nur Theorie oder auch etwas für den alltäglichen Umgang mit anderen? Auf der anderen Seite, lernen die Benutzer nur Kommunikationsmuster ohne deren tieferen Sinn zu verstehen? Es ist auch keine komprehensive Abdeckung des Spektrums möglich, was zu fehlendem Verständniss von Autisten mit "unüblichen" Symptomausprägungen führen kann. Diese Risiken können nicht behoben werden, sondern nur durch eigenes Fachwissen vermindert und durch User Testing möglichst behoben werden.
