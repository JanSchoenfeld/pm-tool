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
        progressbar.className='progress-bar progress-bar-striped bg-success progress-bar-animated';
        progressbar.setAttribute('role','progressbar');
        progressbar.setAttribute('aria-valuenow', "0");
        progressbar.setAttribute('aria-valuemin',"0");
        progressbar.setAttribute('aria-valuemax',"100");
        var progress = 0
        console.log(project.sprints)
        for (let j = 0; j < project.backlogs.length; j++) {
           if (project.sprints[i].backlogs.includes(project.backlogs[j].backlogId) && project.sprints[i].backlogs != null) {
               progress += project.backlogs[j].estimated;
           }
            
        }

        
        progressbar.style.width = progress +"%";
        if (progress >=18) {
            progressbar.appendChild(document.createTextNode(" Der Sprint ist zu "+ progress+  "% voll"));
        }
        else{
            progressbar.appendChild(document.createTextNode(progress+'%'));
        }
        
        //var currentProgress = document.createElement('span');
        //currentProgress.id = progress;
        //progressbar.appendChild(currentProgress);
        progressbarWrapper.appendChild(progressbar);


        var panelBody = document.createElement('div');
        panelBody.className = 'panel-body';
        panel.appendChild(panelBody);


        for (let j = 0; j < project.backlogs.length; j++) {
            if (project.backlogs[j].inSprint == project.sprints[i].sprintId) {
                
                var panelBodyContent = document.createElement('div');
                panelBodyContent.className = 'content contentLeft';
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
};
