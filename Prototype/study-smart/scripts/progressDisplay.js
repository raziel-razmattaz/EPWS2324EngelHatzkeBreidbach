import { getChoices, getContent, getHeader } from "./firebase-test.js"; // Pfad anpassen, falls nötig
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import mermaid from 'mermaid';
import { getMostRecentSavePoint, loadSavePoints } from "./save-load.js";

const flowchartNodes = [
];

async function fetchSectionsForMermaid(sectionId) {
    // Abbruchbedingung: sectionId ist nicht definiert oder bereits verarbeitet
    if (!sectionId || flowchartNodes.some(node => node.id === sectionId)) {
        return;
    }
    
    try {
        const choices = await getChoices(sectionId);
        let node = {id: sectionId, next: choices.map(choice => choice[0])};

        // Überprüfe, ob bereits ein Knoten mit diesen choices existiert
        const nodeAlreadyExists = flowchartNodes.some(existingNode => 
            arraysContainSameElements(existingNode.next, node.next));

        if (!nodeAlreadyExists) {
            flowchartNodes.push(node); // Füge den Knoten nur dann hinzu, wenn er noch nicht existiert
        }

        // Rekursiver Aufruf für jedes choice, aber nur, wenn der Knoten neu ist
        if (!nodeAlreadyExists) {
            choices.forEach(choice => {
                fetchSectionsForMermaid(choice[0]);
            });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Sektionen: ", error);
    }
}

function generateMermaidSyntax(nodes) {
    let mermaidSyntax = 'graph TD;\n';
    nodes.forEach(node => {
        // Definiere jeden Knoten mit einem Punkt als Label
        mermaidSyntax += `${node.id}(".");\n`;
        // Füge alle Verbindungen von diesem Knoten hinzu
        node.next.forEach(nextId => {
            mermaidSyntax += `${node.id}-- text --> ${nextId};\n`;
        });
    });
    return mermaidSyntax;
}




async function renderMermaidChart() {
    // Generiere die Mermaid-Syntax basierend auf dem Array von Knoten
    const mermaidSyntax = generateMermaidSyntax(flowchartNodes);
    // Wähle das Mermaid-Diagramm-Element aus
    const mermaidDiv = document.getElementById('mermaidDiagram');
    if (mermaidDiv) {
        // Setze die generierte Syntax als Inhalt des Elements
        mermaidDiv.innerHTML = mermaidSyntax;
        // Initialisiere Mermaid, um das Diagramm zu rendern
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            flowchart: {
                useMaxWidth: false, // Verhindert, dass Mermaid die Breite auf das Maximum setzt
                htmlLabels: true,
                curve: 'linear',
            },
            // Hier kannst du weitere Anpassungen vornehmen
        });
        mermaid.init(undefined, '.mermaid');
    } else {
        console.error('Mermaid-Diagrammcontainer nicht gefunden.');
    }
}



function createFlowchart() {
    let diagram = 'graph LR;\n';
    let savePointss = loadSavePoints();


    flowchartNodes.forEach(node => {
        node.next.forEach(nextId => {
            
            if (getMostRecentSavePoint() === `${node.id}`) {
                diagram += `${node.id} --> ${nextId}\n style ${node.id} fill:#eb9413,stroke-width:0px;\n`;
                
            } else if ('section01'=== `${node.id}`) {
                diagram += `${node.id} --> ${nextId}\n style ${node.id}  fill:#759EA6, color:#fff, stroke-width:0px;\n`;


            } else if (savePointss.includes(`${node.id}`)) {
                console.log(`${node.id}`);
                // Wenn ja, wende einen speziellen Stil an
                diagram += `${node.id} --> ${nextId}\n style ${node.id}  fill:#759EA6, color:#fff,stroke-width:0px;\n`;
            }  else {
            diagram += `${node.id} --> ${nextId}\n style ${node.id} fill:#595959,stroke-width:0px;\n style ${nextId} fill:#595959,stroke-width:0px;\n`;
            
            }
        });
    });

    document.getElementById('flowchart').innerHTML = diagram;
    mermaid.init(undefined, document.getElementById('flowchart'));
}




function arraysContainSameElements(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) return false;
    }
    return true;
}





document.addEventListener('DOMContentLoaded', async () => {
    
    await fetchSectionsForMermaid('section01'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section02'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section03'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section04'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section05'); // Warte auf die Fertigstellung

    await fetchSectionsForMermaid('section06'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section07'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section08'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section09'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section10'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section11'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section12'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section13'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section14'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section15'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section16'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section17'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section18'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section19'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section20'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section21'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section22'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section23'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section24'); // Warte auf die Fertigstellung
    await fetchSectionsForMermaid('section25'); // Warte auf die Fertigstellung
    console.log(flowchartNodes);
   
    //renderMermaidChart();
    createFlowchart();
    // Initialisiere Mermaid globalmermaid.initialize({startOnLoad: true}); // Initialisiere Mermaid global
    //createFlowchart(); // Erstelle das Flowchart, nachdem die Daten geladen wurden
});

    


    // await generateMermaidChart(); // Rufe die Funktion asynchron auf


