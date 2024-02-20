
let saveAndLoad = require("./save-and-load.js");

//Array aller Nodes
const flowchartNodes = [
    {id: "section01", next: ["section02"]},
    {id: "section02", next: ["section03"]},
    {id: "section03", next: ["section04"]},
    {id: "section04", next: ["section05", "section06", "section07", "section08"]},
    {id: "section05", next: ["section04"]},
    {id: "section06", next: ["section04"]},
    {id: "section07", next: ["section04"]},
    {id: "section08", next: ["section10"]},
    {id: "section09", next: ["section10"]},
    {id: "section10", next: ["section11", "section14"]},
    {id: "section11", next: ["section12"]},
    {id: "section12", next: ["section16"]},
    {id: "section13", next: ["section14"]},
    {id: "section14", next: ["section15"]},
    {id: "section15", next: ["section16"]},
    {id: "section16", next: ["section17", "section23"]},
    {id: "section17", next: ["section18"]},
    {id: "section18", next: ["section19"]},
    {id: "section19", next: ["section20"]},
    {id: "section20", next: ["section21"]},
    {id: "section21", next: ["section22"]},
    {id: "section22", next: ["section29"]},
    {id: "section23", next: ["section24"]},
    {id: "section24", next: ["section25"]},
    {id: "section25", next: ["section26"]},
    {id: "section26", next: ["section27"]},
    {id: "section27", next: ["section28"]},
    {id: "section28", next: ["section29"]},
    {id: "section29", next: ["section30"]},
    {id: "section30", next: []},
];

drawProgressChart(flowchartNodes, saveAndLoad.savePoints);
function drawProgressChart(flowchartNodes, savePoints) {
    // Prepare the data for the chart
    let labels = flowchartNodes.map(node => node.id); // Labels are the section IDs
    let dataPoints = flowchartNodes.map(() => 0); // Initialize all data points to 0 (unvisited)

    //load the array of all visited nodes
    saveAndLoad.loadSavePoints();
    // Mark visited sections
    savePoints.forEach(savePoint => {
        let index = labels.indexOf(savePoint.id);
        if (index !== -1) {
            dataPoints[index] = 1; // Mark as visited
        }
    });

    //get most recent node
    saveAndLoad.getMostRecentSavePoint();
    // Mark the last visited (current) node, which is the one with the latest timestamp
    if (savePoints.length > 0) {
        const lastVisitedIndex = labels.indexOf(savePoints[savePoints.length - 1].id);
        dataPoints[lastVisitedIndex] = 2; // Mark as current
    }

    // Get the context of the canvas element we want to select
    let ctx = document.getElementById('progressChart').getContext('2d');

    // Draw the chart
    new Chart(ctx, {
        type: 'line', // Line chart to show progression
        data: {
            labels: labels,
            datasets: [{
                label: 'Your Progress',
                data: dataPoints,
                fill: false,
                tension: 0.1,
                pointBackgroundColor: dataPoints.map(point => {
                    // Different colors for the points based on their state
                    if (point === 2) return 'rgb(255, 99, 132)'; // Current node color
                    if (point === 1) return 'rgb(75, 192, 192)'; // Visited node color
                    return 'rgb(201, 203, 207)'; // Unvisited node color
                })
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // We don't need y-axis ticks for this chart as we're using colors to differentiate
                        display: false
                    },
                    grid: {
                        display: false // Hide the grid lines for the y-axis
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide the legend as we're using colors to show progress
                }
            }
        }
    });
}

// Example usage:
// Assuming `savePoints` is your array of save points with timestamps
// and `flowchartNodes` is the array of nodes as you provided


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

