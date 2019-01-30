const fs = require('fs');
const path = require('path');
const {
    ipcRenderer
} = require('electron');


let PROJECTS;
let project;
let POSITION = fs.readFileSync(path.join(path.join(require('os').homedir() + '/.pm-tool/POSITION.json')));


ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
})

ipcRenderer.send("reqPROJECTS");

function reload() {
    location.reload();

}

function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);

}