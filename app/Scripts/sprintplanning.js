const fs = require('fs');
const path = require('path');
const {
    remote, ipcRenderer
} = require('electron');

let PROJECTS;
let project;
let POSITION = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/global/POSITION.json')));
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
    leftCol.appendChild(leftPanelGroup);
    for (let i = 0; i < project.sprints.length; i++) {
        var panel = document.createElement('div');
        panel.className = 'sprintContent';
        leftPanelGroup.appendChild(panel);

        var panelHead = document.createElement('div');
        panelHead.className = 'alert alert-success';
        var headline = document.createTextNode('Sprint: ' + project.sprints[i].name + " ");
        var headlineWrapper = document.createElement('h5');
        headlineWrapper.id = "headlineWrapper" + i;
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
        progressbar.id = "progressBar" + i;
        progressbarWrapper.appendChild(progressbar);
        var progress = progressBarWidth(i);


        /*
        progressbar.setAttribute('aria-valuenow', progress.toString());
        progressbar.setAttribute('aria-valuemin', "0");
        progressbar.setAttribute('aria-valuemax', project.sprints[i].capacity.toString());
        */



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
            panelBodyContent.id = "backlog-" + i;
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
    let targetSprintIndex = ev.target.id;
    if (ev.target.id != '') {
        if (targetSprintIndex == 'backlog') {
            if (data.length > 1) {
                var backlogIndex = data.substring(data.length - (data.length - 1), data.length);
            }
            else {
                var backlogIndex = data;
            }
        }
        else if (data.startsWith("backlog")) {
            var backlogIndex = data.split('-')[1];
        }
        else {
            if (data.length > 1) {
                var backlogIndex = data.substring(data.length - (data.length - 1), data.length);
            }
            else {
                var backlogIndex = data;
            }
        }
        let sprintIndex = data.substring(data.length - (data.length), data.length - (data.length - 1))


        if (targetSprintIndex != 'backlog') {
            let progress = 0;
            for (let i = 0; i < project.backlogs.length; i++) {
                if (project.sprints[targetSprintIndex].backlogs != null && project.sprints[targetSprintIndex].backlogs.includes(project.backlogs[i].backlogId)) {
                    progress += project.backlogs[i].estimated;
                }

            }
            if ((progress + project.backlogs[backlogIndex].estimated) <= project.sprints[targetSprintIndex].capacity) {

                project.sprints[targetSprintIndex].backlogs.push(project.backlogs[backlogIndex].backlogId);
                project.backlogs[backlogIndex].inSprint = project.sprints[targetSprintIndex].sprintId;
                syncProjects();
            }
            else {
                alert("Die Maximal Kapazität wurde überschritten \n")
            }
        }
        else {
            let del;
            for (let i = 0; i < project.sprints[sprintIndex].backlogs.length; i++) {
                if (project.sprints[sprintIndex].backlogs[i] == project.backlogs[backlogIndex].backlogId) {

                    project.backlogs[backlogIndex].inSprint = null;
                    del = i;
                    syncProjects();
                }
            }
            project.sprints[sprintIndex].backlogs.splice(del, 1);
            syncProjects();
            siteContent()

        }

    } else {
        alert('Not a valid target!')
    }

    while (pageContent.firstChild) {
        pageContent.removeChild(pageContent.firstChild);
    }
    siteContent();
}
function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);
  }


function progressBarWidth(SprintIndex, ) {
    let progress = 0;

    for (let j = 0; j < project.backlogs.length; j++) {
        if (project.sprints[SprintIndex].backlogs != null && project.sprints[SprintIndex].backlogs.includes(project.backlogs[j].backlogId)) {
            progress += project.backlogs[j].estimated;
        }
    }
    var headlineWrapper = document.getElementById("headlineWrapper" + SprintIndex);
    var headlineCapacity = document.createTextNode("(" + progress + "/" + project.sprints[SprintIndex].capacity + ")");
    headlineWrapper.appendChild(headlineCapacity);
    progress = Math.round(((progress / project.sprints[SprintIndex].capacity) * 100));
    let progressbar = document.getElementById(("progressBar" + SprintIndex));
    if (progress >= 18) {
        while (progressbar.firstChild) {
            progressbar.removeChild(progressbar.firstChild);
        }
        progressbar.appendChild(document.createTextNode("Der Sprint ist zu " + progress + "% voll"));
    }
    else {
        while (progressbar.firstChild) {
            progressbar.removeChild(progressbar.firstChild);
        }
        progressbar.appendChild(document.createTextNode(progress + '%'));
    }

    progressbar.style.width = progress + "%";
    return progress;
}




function reload() {
    location.reload();

}

function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);

}
