const fs = require('fs');
const path = require('path');
const {
    remote, ipcRenderer
} = require('electron');

let PROJECTS;
let project;
let POSITION = JSON.parse(fs.readFileSync('data/global/POSITION.json'));
var pageContent = document.getElementById('sprintplanning');



ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
    siteContent();
});

ipcRenderer.send("reqPROJECTS");

function siteContent() {
    var row = document.createElement('div');
    row.className = 'row';
    row.id = 'row'
    pageContent.appendChild(row);

    var leftCol = document.createElement('div');
    leftCol.className = 'col leftCol';
    leftCol.id = 'leftCol';
    row.appendChild(leftCol);

    var rightCol = document.createElement('div');
    rightCol.className = 'col col-lg-5';
    rightCol.id = 'rightCol'
    row.appendChild(rightCol);

    var panelGroup = document.createElement('div');
    panelGroup.className='panel-group';

    for (let index = 0; index < 100; index++) {
        var panel = document.createElement('div');
        panel.className='contentLeft';
        panelGroup.appendChild(panel);

        var panelHead = document.createElement('div');
        panelHead.className= 'alert alert-success';
        panelHead.appendChild(document.createTextNode('Test '+index));
        panel.appendChild(panelHead);

        var panelBody = document.createElement('div');
        panelBody.className='panel-body';
        panelBody.appendChild(document.createTextNode('Hallo das ist ein Body von '+index));
        panel.appendChild(panelBody);
    }
    leftCol.appendChild(panelGroup);
    var content = document.createElement('div');
    content.className = 'col';
    rightCol.appendChild(content);
    var text = document.createTextNode('hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo ')
    content.appendChild(text);
};
