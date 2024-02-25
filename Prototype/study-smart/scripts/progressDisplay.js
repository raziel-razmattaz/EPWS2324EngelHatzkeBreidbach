import { getChoices } from "./firebase-test.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import mermaid from 'mermaid';
import { getMostRecentSavePoint, loadSavePoints } from "./save-load.js";

const flowchartNodes = [];

const mermaidInit = {'theme':'base', 'themeVariables': {'lineColor': '#759EA6'}};

async function fetchSectionsForMermaid(sectionId, visitedNodes = new Set()) {
    try {
        if (visitedNodes.has(sectionId)) {
            console.log(`Node ${sectionId} already visited. Skipping...`);
            return;
        }
        visitedNodes.add(sectionId);
        const choices = await getChoices(sectionId);
        let node = { id: sectionId, next: choices.map(choice => choice[0]) };
        flowchartNodes.push(node);
        console.log(node);
        await Promise.all(node.next.map(choice => fetchSectionsForMermaid(choice, visitedNodes)));
    } catch (error) {
        console.error("Fehler beim Abrufen der Sektionen: ", error);
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
                diagram += `${node.id} --> ${nextId}\n style ${node.id}  fill:#759EA6, color:#fff,stroke-width:0px;\n`;
            }  else {
            diagram += `${node.id} --> ${nextId}\n style ${node.id} fill:#595959,stroke-width:0px;\n style ${nextId} fill:#595959,stroke-width:0px;\n`;
            }
        });
    });
    document.getElementById('flowchart').innerHTML = diagram;
    mermaid.init(mermaidInit, document.getElementById('flowchart'));
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchSectionsForMermaid('section01', new Set());
    console.log(flowchartNodes);
    createFlowchart();
});


