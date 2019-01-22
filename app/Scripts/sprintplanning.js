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

    var leftPanelGroup = document.createElement('div');
    leftPanelGroup.className = 'panel-group';

    for (let i = 0; i < project.sprints.length; i++) {
        var panel = document.createElement('div');
        panel.className = 'sprintContent';
        leftPanelGroup.appendChild(panel);

        var panelHead = document.createElement('div');
        panelHead.className = 'alert alert-success';
        var headline = document.createTextNode('Sprint ' + project.sprints[i].sprintId);
        var headlineWrapper = document.createElement('h5');
        headlineWrapper.appendChild(headline);
        panelHead.appendChild(headlineWrapper);
        panel.appendChild(panelHead);

        var panelBody = document.createElement('div');
        panelBody.className = 'panel-body';
        panel.appendChild(panelBody);
        for (let j = 0; j < project.sprints[i].backlogItemIds.length; j++) {
            console.log(project.sprints[i].backlogItemIds[j]);
       
            var panelBodyContent = document.createElement('div');
            panelBodyContent.className = 'content contentLeft';
            panelBody.appendChild(panelBodyContent);
            for (let k = 0; k < project.backlogs.length; k++) {
                if (project.sprints[i].backlogItemIds[j].backlogID == project.backlogs[k].backlogId) {
                    var infoDiv = document.createElement('div');
                    panelBodyContent.appendChild(infoDiv);

                    var backlog = document.createElement('div');
                    infoDiv.appendChild(backlog);
                    
                    var title = document.createElement('div')
                    var bold = document.createElement('b')
                    bold.className = 'font-weight-bold'
                    bold.appendChild(document.createTextNode("Title: "))
                    title.appendChild(bold);
                    title.appendChild(document.createTextNode(project.backlogs[k].title));
                    backlog.appendChild(title);

                    var description = document.createElement('div')
                    var bold = document.createElement('b')
                    bold.className = 'font-weight-bold'
                    bold.appendChild(document.createTextNode("Beschreibung: "))
                    description.appendChild(bold);
                    description.appendChild(document.createTextNode(project.backlogs[k].description));
                    backlog.appendChild(description);

                    var priority = document.createElement('div')
                    var bold = document.createElement('b')
                    bold.className = 'font-weight-bold'
                    bold.appendChild(document.createTextNode("Priorität: "))
                    priority.appendChild(bold);
                    priority.appendChild(document.createTextNode(project.backlogs[k].priority.priority));
                    backlog.appendChild(priority);                    

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
    leftCol.appendChild(leftPanelGroup);

    var rightPanelGroup = document.createElement('div');
    rightPanelGroup.className = 'panel-group';
 

    var content = document.createElement('b');
    content.className = 'col';
    rightCol.appendChild(content);
    var text = document.createTextNode('hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo hallo ')
    content.appendChild(text);
};
