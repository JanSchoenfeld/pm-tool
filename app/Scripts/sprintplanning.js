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
    panelGroup.className = 'panel-group';

    for (let i = 0; i < project.sprints.length; i++) {
        var panel = document.createElement('div');
        panel.className = 'contentLeft';
        panelGroup.appendChild(panel);

        var panelHead = document.createElement('div');
        panelHead.className = 'alert alert-success';
        panelHead.appendChild(document.createTextNode('Sprint ' + project.sprints[i].sprintId));
        panel.appendChild(panelHead);

        var panelBody = document.createElement('div');
        panelBody.className = 'panel-body';
        panel.appendChild(panelBody);

        for (let j = 0; j < project.sprints[i].backlogItemIds.length; j++) {
            var panelBodyContent = document.createElement('div');
            panelBodyContent.className = 'content';
            panelBody.appendChild(panelBodyContent);
            for (let k = 0; k < project.backlogs.length; k++) {
                if (project.sprints[i].backlogItemIds[j].backlogID == project.backlogs[k].backlogId) {
                    var infoDiv = document.createElement('div');
                    panelBodyContent.appendChild(infoDiv);

                    var backlog = document.createElement('div');
                    backlog.appendChild(document.createTextNode(project.backlogs[k].title))
                    infoDiv.appendChild(backlog);

                    var actionDiv = document.createElement('div');
                    infoDiv.appendChild(actionDiv);
                    var editIcon = document.createElement('i');
                    editIcon.className = "far fa-edit";
                    var deleteIcon = document.createElement('i');
                    deleteIcon.className = "far fa-trash-alt";
                    actionDiv.appendChild(editIcon);
                    actionDiv.appendChild(deleteIcon);
                }

            }
        }

    }
    leftCol.appendChild(panelGroup);
    
    var content = document.createElement('div');
    content.className = 'col';
    rightCol.appendChild(content);
    var text = document.createTextNode('hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo ')
    content.appendChild(text);
};
