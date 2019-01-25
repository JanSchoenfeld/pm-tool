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
        var headline = document.createTextNode('Sprint: ' + project.sprints[i].name);
        var headlineWrapper = document.createElement('h5');
        headlineWrapper.appendChild(headline);
        panelHead.appendChild(headlineWrapper);
        panel.appendChild(panelHead);

        //progressbar
        var progressbarWrapper = document.createElement('div');
        progressbarWrapper.className = 'progress'
        panelHead.appendChild(progressbarWrapper);
        var progressbar = document.createElement('div');
        progressbar.className = 'progress-bar progress-bar-striped bg-success progress-bar-animated';
        progressbar.setAttribute('role', 'progressbar');
        var progress = 0
        for (let j = 0; j < project.backlogs.length; j++) {
            if ( project.sprints[i].backlogs != null && project.sprints[i].backlogs.includes(project.backlogs[j].backlogId)) {
                progress += project.backlogs[j].estimated;
            }
        }
        progressbar.setAttribute('aria-valuenow', progress.toString());
        progressbar.setAttribute('aria-valuemin', "0");
        progressbar.setAttribute('aria-valuemax', project.sprints[i].capacity.toString());


        progressbar.style.width = ((progress / project.sprints[i].capacity) * 100) + "%";

        if (((progress / project.sprints[i].capacity) * 100) >= 18) {
            progressbar.appendChild(document.createTextNode("Der Sprint ist zu " + ((progress / project.sprints[i].capacity) * 100) + "% voll"));
        }
        else {
            progressbar.appendChild(document.createTextNode(((progress / project.sprints[i].capacity) * 100) + '%'));
        }

        progressbarWrapper.appendChild(progressbar);


        var panelBody = document.createElement('div');
        panel.id = i;
        panel.addEventListener('drop', drop);
        panel.addEventListener('dragover', allowDrop);
        panelBody.className = 'panel-body';
        panel.appendChild(panelBody);


        for (let j = 0; j < project.backlogs.length; j++) {
            if (project.backlogs[j].inSprint == project.sprints[i].sprintId) {

                var panelBodyContent = document.createElement('div');
                panelBodyContent.className = 'content contentLeft';
                panelBodyContent.id = i.toString() + j.toString();
                panelBodyContent.draggable = true;
                panelBodyContent.addEventListener('dragstart', drag);
                panelBodyContent.addEventListener('dragover', function () {
                    return false;
                });
                panelBody.appendChild(panelBodyContent);


                var infoDiv = document.createElement('div');
                panelBodyContent.appendChild(infoDiv);

                var backlog = document.createElement('div');
                infoDiv.appendChild(backlog);

                var id = document.createElement('div')
                var bold = document.createElement('b')
                bold.className = 'font-weight-bold'
                bold.appendChild(document.createTextNode("ID: "))
                id.appendChild(bold);
                id.appendChild(document.createTextNode(project.backlogs[j].backlogId));
                backlog.appendChild(id);

                var title = document.createElement('div')
                var bold = document.createElement('b')
                bold.className = 'font-weight-bold'
                bold.appendChild(document.createTextNode("Title: "))
                title.appendChild(bold);
                title.appendChild(document.createTextNode(project.backlogs[j].title));
                backlog.appendChild(title);

                var description = document.createElement('div')
                var bold = document.createElement('b')
                bold.className = 'font-weight-bold'
                bold.appendChild(document.createTextNode("Beschreibung: "))
                description.appendChild(bold);
                description.appendChild(document.createTextNode(project.backlogs[j].description));
                backlog.appendChild(description);

                var priority = document.createElement('div')
                var bold = document.createElement('b')
                bold.className = 'font-weight-bold'
                bold.appendChild(document.createTextNode("Priorität: "))
                priority.appendChild(bold);
                priority.appendChild(document.createTextNode(project.backlogs[j].priority));
                backlog.appendChild(priority);

                var estimated = document.createElement('div')
                var bold = document.createElement('b')
                bold.className = 'font-weight-bold'
                bold.appendChild(document.createTextNode("Zeitaufwand: "))
                estimated.appendChild(bold);
                estimated.appendChild(document.createTextNode(project.backlogs[j].estimated));
                backlog.appendChild(estimated);

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
    leftCol.appendChild(leftPanelGroup);

    var rightPanelGroup = document.createElement('div');
    rightPanelGroup.className = 'panel-group';


    var panel = document.createElement('div');
    panel.className = 'sprintContent';
    panel.addEventListener('drop', drop);
    panel.addEventListener('dragover', allowDrop);
    panel.id = 'backlog'
    rightPanelGroup.appendChild(panel);

    var panelHead = document.createElement('div');
    panelHead.className = 'alert alert-success';
    var headline = document.createTextNode('Sprintbacklog');
    var headlineWrapper = document.createElement('h5');
    headlineWrapper.appendChild(headline);
    panelHead.appendChild(headlineWrapper);
    panel.appendChild(panelHead);

    var panelBody = document.createElement('div');
   
    panelBody.className = 'panel-body';
    panel.appendChild(panelBody);
    for (let i = 0; i < project.backlogs.length; i++) {

        if (project.backlogs[i].inSprint == null) {

            var panelBodyContent = document.createElement('div');
            panelBodyContent.className = 'content contentLeft';
            panelBody.appendChild(panelBodyContent);
            panelBodyContent.id = i;
            panelBodyContent.draggable = true;
            panelBodyContent.addEventListener('dragstart', drag);
            panelBodyContent.addEventListener('dragover', function () {
                return false;
            });

            var infoDiv = document.createElement('div');
            panelBodyContent.appendChild(infoDiv);

            var backlog = document.createElement('div');
            infoDiv.appendChild(backlog);

            var id = document.createElement('div')
            var bold = document.createElement('b')
            bold.className = 'font-weight-bold'
            bold.appendChild(document.createTextNode("ID: "))
            id.appendChild(bold);
            id.appendChild(document.createTextNode(project.backlogs[i].backlogId));
            backlog.appendChild(id);

            var title = document.createElement('div')
            var bold = document.createElement('b')
            bold.className = 'font-weight-bold'
            bold.appendChild(document.createTextNode("Title: "))
            title.appendChild(bold);
            title.appendChild(document.createTextNode(project.backlogs[i].title));
            backlog.appendChild(title);

            var description = document.createElement('div')
            var bold = document.createElement('b')
            bold.className = 'font-weight-bold'
            bold.appendChild(document.createTextNode("Beschreibung: "))
            description.appendChild(bold);
            description.appendChild(document.createTextNode(project.backlogs[i].description));
            backlog.appendChild(description);

            var priority = document.createElement('div')
            var bold = document.createElement('b')
            bold.className = 'font-weight-bold'
            bold.appendChild(document.createTextNode("Priorität: "))
            priority.appendChild(bold);
            priority.appendChild(document.createTextNode(project.backlogs[i].priority));
            backlog.appendChild(priority);

            var estimated = document.createElement('div')
            var bold = document.createElement('b')
            bold.className = 'font-weight-bold'
            bold.appendChild(document.createTextNode("Zeitaufwand: "))
            estimated.appendChild(bold);
            estimated.appendChild(document.createTextNode(project.backlogs[i].estimated));
            backlog.appendChild(estimated);

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
    rightCol.appendChild(rightPanelGroup);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    console.log(ev.target.id)
    if (ev.target.id != '') {
        var backlogID = data.substring(data.length - (data.length-1), data.length);;
        var targetSprint = ev.target.id;
        ev.target.appendChild(document.getElementById(data));

        if (targetSprint != 'backlog') {
            project.sprints[targetSprint].backlogs.push(project.backlogs[backlogID].backlogId);
            project.backlogs[backlogID].inSprint = project.sprints[targetSprint].sprintId;     
            syncProjects();
        }
        else {
            for (let i = 0; i < project.sprints[targetSprint].backlogs.length; i++) {
                if(project.sprints[targetSprint].backlogs[i] == project.backlogs[backlogID].backlogId)
                {
                    project.backlogs[backlogID].backlogId == null;
                    project.sprints[targetSprint].backlogs.splice(i,1);
                }
            }
                }
        
    } else {
        alert('Not a valid target!')
    }

}
function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);
  }
