const Chart = require("chart.js");
const fs = require("fs");
const {
    ipcRenderer
} = require("electron");

let PROJECTS;
let project;
let POSITION = fs.readFileSync('data/global/POSITION.json');
let estimate;

ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
    estimate = project.projectEstimate;
    console.log(estimate)
    siteContent();
})

ipcRenderer.send("reqPROJECTS");


function siteContent() {
    let ctx = document.getElementById("bdChart").getContext("2d");

    let myChart = new Chart(ctx, {
        type: 'line',
        borderColor: 'rgba(255, 0, 0, 0.8)',
        backgroundColor: "rgba(255,99,132, 0)",
        data: {
            labels: ["Start", "End"],
            datasets: [{
                label: 'Remaining Effort',
                data: [estimate, 0],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}