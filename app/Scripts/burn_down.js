const Chart = require("chart.js");
const fs = require("fs");
const path = require("path");
const {
    ipcRenderer
} = require("electron");

let PROJECTS;
let project;
let POSITION = fs.readFileSync(path.join(__dirname, '../data/global/POSITION.json'));
let estimate;

ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
    estimate = project.projectEstimate;
    siteContent();
})

ipcRenderer.send("reqPROJECTS");

function siteContent() {
    let ctx = document.getElementById("bdChart").getContext("2d");

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Project Start", "Project Deadline"],
            datasets: [{
                label: 'Remaining Effort',
                borderColor: "rgba(255, 0, 0, 0.8)",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
                fill: false,
                data: [estimate, 0],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

        }
    })
}