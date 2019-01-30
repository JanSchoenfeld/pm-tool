const fs = require('fs');
const path = require('path');
const {
    remote,
    ipcRenderer
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
                editIcon.onclick = function () {
                    displayEditBacklogItem(j);
                };
                actionDiv.appendChild(editIcon);

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
            } else {
                var backlogIndex = data;
            }
        } else if (data.startsWith("backlog")) {
            var backlogIndex = data.split('-')[1];
        } else {
            if (data.length > 1) {
                var backlogIndex = data.substring(data.length - (data.length - 1), data.length);
            } else {
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
            } else {
                alert("Die Maximal Kapazität wurde überschritten \n")
            }
        } else {
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
    let json = JSON.stringify(project, null, '\t');
    fs.writeFileSync(path.join(__dirname, '../data/') + project.title.replace(/\s+/g, '').toLowerCase() + '.json', json, 'utf-8');
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
    } else {
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

//Displays Modal with Option to Add a Epic, Backlog, Task or Sprint
function displayChooseItem() {
    $("#modal_chooseItem").modal("show");

}

//Closed the Modal
function closeChooseItem() {
    $("#modal_chooseItem").modal("hide");
}

//Displays Modal to add a Backlog Item
function displayAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    let selectSprint = document.getElementById("b_item_assign_to_sprint");
    let selectEpic = document.getElementById("b_item_assign_to_epic");
    $("#b_item_assign_to_sprint").empty();
    selectSprint.options[selectSprint.options.length] = new Option("", "");
    for (let i = 0; i < project.sprints.length; i++) {
        let id = project.sprints[i].sprintId;
        selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + project.sprints[i].name, id);
    }
    $("#b_item_assign_to_epic").empty();
    selectEpic.options[selectEpic.options.length] = new Option("", "");
    for (let i = 0; i < project.epics.length; i++) {
        let id = project.epics[i].epicId;
        selectEpic.options[selectEpic.options.length] = new Option("Epic: " + project.epics[i].title, id);
    }
    closeChooseItem();
    $("#modal_add_backlogItem").modal("show");
}

//Add new Backlog Item to DataStore
function addBacklogItem() {
    let item_name = document.getElementById("b_item_name").value;
    let item_description = document.getElementById("b_item_description").value;
    let item_estimate_time = document.getElementById("b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("b_item_assign_to_sprint").value;
    let item_assign_to_epic = document.getElementById("b_item_assign_to_epic").value;
    let tmpBLitem = new BacklogItem(item_name, item_description, item_estimate_time);

    if (item_assign_to_epic === "") {
        tmpBLitem.inEpic = null;

    } else {
        tmpBLitem.inEpic = item_assign_to_epic;
        project.epics.find(x => x.epicId === item_assign_to_epic).backlogs.push(tmpBLitem.backlogId);
    }

    if (item_assign_to_sprint === "") {
        tmpBLitem.inSprint = null;
    } else {
        tmpBLitem.inSprint = item_assign_to_sprint;
        project.sprints.find(x => x.sprintId === item_assign_to_sprint).backlogs.push(tmpBLitem.backlogId);
    }

    project.backlogs.push(tmpBLitem);

    PROJECTS[POSITION] = project;

    syncProjects();
    closeAddBacklogItem();
    reload();
}

//Close Modal to add a Backlog Item
function closeAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    $("#modal_add_backlogItem").modal('hide');
}

//Displays Modal to edit a Backlog Item, parameter is Array position
function displayEditBacklogItem(i) {
    document.getElementById("form_edit_BacklogItem").reset();
    document.getElementById("edit_b_item_name").value = project.backlogs[i].title;
    document.getElementById("edit_b_item_description").value = project.backlogs[i].description;
    document.getElementById("edit_b_item_estimate_time").value = project.backlogs[i].estimated;
    document.getElementById("edit_b_item_id").value = project.backlogs[i].backlogId;
    document.getElementById("edit_b_item_epicId").value = project.backlogs[i].inEpic;
    let selectedEpic = project.backlogs[i].inEpic;
    document.getElementById("edit_b_item_sprintId").value = project.backlogs[i].inSprint;
    let selectedSprint = project.backlogs[i].inSprint;
    let selectSprint = document.getElementById("edit_b_item_assign_to_sprint");
    $("#edit_b_item_assign_to_sprint").empty();
    selectSprint.options[selectSprint.options.length] = new Option("", "");
    for (let i = 0; i < project.sprints.length; i++) {
        let id = project.sprints[i].sprintId;

        if (selectedSprint === id) {
            selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + project.sprints[i].name, id, false, true);
        } else {
            selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + project.sprints[i].name, id);
        }
    }
    let selectEpic = document.getElementById("edit_b_item_assign_to_epic");
    $("#edit_b_item_assign_to_epic").empty();
    selectEpic.options[selectEpic.options.length] = new Option("", "");
    for (let i = 0; i < project.epics.length; i++) {
        let id = project.epics[i].epicId;

        if (selectedEpic === id) {
            selectEpic.options[selectEpic.options.length] = new Option("Epic: " + project.epics[i].title, id, false, true);
        } else {
            selectEpic.options[selectEpic.options.length] = new Option("Epic: " + project.epics[i].title, id);
        }
    }
    listTasksOfBacklog(project.backlogs[i].backlogId);
    $("#modal_edit_backlogItem").modal("show");
}

//Save edited backlog item to datastore
function saveBacklogItem() {
    let item_name = document.getElementById("edit_b_item_name").value;
    let item_description = document.getElementById("edit_b_item_description").value;
    let item_estimate_time = document.getElementById("edit_b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("edit_b_item_assign_to_sprint").value;
    let item_assign_to_epic = document.getElementById("edit_b_item_assign_to_epic").value;
    let item_id = document.getElementById("edit_b_item_id").value;

    for (let i = 0; i < project.backlogs.length; i++) {

        if (project.backlogs[i].backlogId === item_id) {
            project.backlogs[i].title = item_name;
            project.backlogs[i].description = item_description;
            project.backlogs[i].estimated = item_estimate_time;
            if (item_assign_to_sprint === "") {
                //Kein Sprint zugewiesen
                if (project.backlogs[i].inSprint != null) {
                    //läuft
                    let indexToRemove = project.sprints.find(x => x.sprintId === project.backlogs[i].inSprint).backlogs.findIndex(x => x === project.backlogs[i].backlogId);
                    project.sprints.find(x => x.sprintId === project.backlogs[i].inSprint).backlogs.splice(indexToRemove, 1);
                    project.backlogs[i].inSprint = null;
                } else {
                    project.backlogs[i].inSprint = null;
                }

            } else {
                //Sprint zugewiesen
                if (project.backlogs[i].inSprint != null) {
                    //läuft
                    let indexToRemove = project.sprints.find(x => x.sprintId === project.backlogs[i].inSprint).backlogs.findIndex(x => x === project.backlogs[i].backlogId);
                    project.sprints.find(x => x.sprintId === project.backlogs[i].inSprint).backlogs.splice(indexToRemove, 1);
                    project.backlogs[i].inSprint = item_assign_to_sprint;
                    project.sprints.find(x => x.sprintId === item_assign_to_sprint).backlogs.push(item_id);
                } else {
                    project.backlogs[i].inSprint = item_assign_to_sprint;
                    project.sprints.find(x => x.sprintId === item_assign_to_sprint).backlogs.push(item_id);
                }
            }

            if (item_assign_to_epic === "") {
                if (project.backlogs[i].inEpic != null) {
                    let indexToRemove = project.epics.find(x => x.epicId === project.backlogs[i].inEpic).backlogs.findIndex(x => x === project.backlogs[i].backlogId);
                    project.epics.find(x => x.epicId === project.backlogs[i].inEpic).backlogs.splice(indexToRemove, 1);
                    project.backlogs[i].inEpic = null;
                } else {
                    project.backlogs[i].inEpic = null;
                }

            } else {
                //Epic zugewiesen
                //läuft
                if (project.backlogs[i].inEpic != null) {
                    let indexToRemove = project.epics.find(x => x.epicId === project.backlogs[i].inEpic).backlogs.findIndex(x => x === project.backlogs[i].backlogId);
                    project.epics.find(x => x.epicId === project.backlogs[i].inEpic).backlogs.splice(indexToRemove, 1);
                    project.backlogs[i].inEpic = item_assign_to_epic;
                    project.epics.find(x => x.epicId === item_assign_to_epic).backlogs.push(item_id);
                } else {
                    project.backlogs[i].inEpic = item_assign_to_epic;
                    project.epics.find(x => x.epicId === item_assign_to_epic).backlogs.push(item_id);
                }
            }
        }
    }
    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
    closeEditBacklogItem();
}

//Close Modal to edit a Backlog Item
function closeEditBacklogItem() {
    document.getElementById("form_edit_BacklogItem").reset();
    $("#modal_edit_backlogItem").modal("hide");
}

//Displays Modal to add a Epic Capture
function displayAddEpicCapture() {
    document.getElementById("form_addEpicCapture").reset();
    closeChooseItem();
    $("#modal_add_epicCapture").modal("show");
}

//Add new Epic Capture to DataStore
function addEpicCapture() {
    let item_name = document.getElementById("e_item_name").value;
    let item_description = document.getElementById("e_item_description").value;
    let item_estimate_time = document.getElementById("e_item_estimate_time").value;
    let epicCapture = new EpicCapture(item_name, item_description, "high", "high", item_estimate_time);

    project.epics.push(epicCapture);

    PROJECTS[POSITION] = project;

    syncProjects();
    closeAddEpicCapture();
    reload();
}

function closeAddEpicCapture() {
    $("#modal_add_epicCapture").modal('hide');
}

function displayEditEpicCapture(i) {

    document.getElementById("form_edit_epicCapture").reset();
    document.getElementById("edit_e_item_name").value = project.epics[i].title;
    document.getElementById("edit_e_item_description").value = project.epics[i].description;
    document.getElementById("edit_e_item_estimate_time").value = project.epics[i].estimated;
    document.getElementById("edit_e_item_id").value = project.epics[i].epicId;
    $("#modal_edit_epicCapture").modal("show");
}

//Save edited Epic Capture to Datastore
function saveEpicCapture() {
    let item_name = document.getElementById("edit_e_item_name").value;
    let item_description = document.getElementById("edit_e_item_description").value;
    let item_estimate_time = document.getElementById("edit_e_item_estimate_time").value;
    let item_id = document.getElementById("edit_e_item_id").value;

    for (let i = 0; i < project.epics.length; i++) {
        if (project.epics[i].epicId == item_id) {
            project.epics[i].title = item_name;
            project.epics[i].description = item_description;
            project.epics[i].estimated = item_estimate_time;
            reload();
        }
    }
    PROJECTS[POSITION] = project;

    syncProjects();
    closeEditEpicCapture();
}

function closeEditEpicCapture() {
    document.getElementById("form_edit_epicCapture").reset();
    $("#modal_edit_epicCapture").modal("hide");
}

function displayAddSprint() {
    document.getElementById("form_addSprint").reset();
    closeChooseItem();
    $("#modal_add_sprint").modal("show");
}

function closeAddSprint() {
    document.getElementById("form_addSprint").reset();
    $("#modal_add_sprint").modal("hide");
}

//Add new Sprint to Datastore
function addSprint() {
    let sprint_name = document.getElementById("s_name").value;
    let sprint_startdate = document.getElementById("s_startdate").value;
    let sprint_enddate = document.getElementById("s_enddate").value;
    let sprint_capacity = document.getElementById("s_capacity").value;
    let sprint1;
    sprint1 = new Sprint(sprint_name, sprint_startdate, sprint_enddate, sprint_capacity);

    project.sprints.push(sprint1);

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
    closeAddSprint();
}

function displayEditSprint(s) {
    document.getElementById("form_editSprint").reset();
    document.getElementById("edit_s_name").value = project.sprints[s].name;
    document.getElementById("edit_s_startdate").value = project.sprints[s].startdate;
    document.getElementById("edit_s_enddate").value = project.sprints[s].enddate;
    document.getElementById("edit_s_capacity").value = project.sprints[s].capacity;
    document.getElementById("edit_s_item_id").value = project.sprints[s].sprintId;

    $("#modal_edit_sprint").modal("show");
}
//Save edit Sprint to Datastore
function saveSprint() {
    let sprint_name = document.getElementById("edit_s_name").value;
    let sprint_startdate = document.getElementById("edit_s_startdate").value;
    let sprint_enddate = document.getElementById("edit_s_enddate").value;
    let sprint_capacity = document.getElementById("edit_s_capacity").value;
    let sprint_id = document.getElementById("edit_s_item_id").value;

    for (let i = 0; i < project.sprints.length; i++) {
        if (project.sprints[i].sprintId == sprint_id) {
            project.sprints[i].name = sprint_name;
            project.sprints[i].startdate = sprint_startdate;
            project.sprints[i].enddate = sprint_enddate;
            project.sprints[i].capacity = sprint_capacity;
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    closeEditEpicCapture();
    reload();
}

function closeEditSprint() {
    document.getElementById("form_editSprint").reset();
    $("#modal_edit_sprint").modal("hide");
}

function deleteBacklog() {
    let id = document.getElementById("edit_b_item_id").value;

    for (let i = 0; i < project.backlogs.length; i++) {
        if (id === project.backlogs[i].backlogId) {
            deleteTasksInBacklog(id);
            delete project.backlogs[i];
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteBacklogsInEpic(epicId) {
    let counter = project.backlogs.length;
    //let toDelete = [];
    for (let i = 0; i < counter; i++) {
        if (epicId === project.backlogs[i].inEpic) {
            deleteTasksInBacklog(project.backlogs[i].backlogId);
            delete project.backlogs[i];
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteEpicCapture() {
    let id = document.getElementById("edit_e_item_id").value;
    for (let i = 0; i < project.epics.length; i++) {
        if (id === project.epics[i].epicId) {
            deleteBacklogsInEpic(id);
            delete project.epics[i];
        }
    }
    //deleteBacklogsInEpic(id);

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteSprint() {
    let id = document.getElementById("edit_s_item_id").value;

    for (let i = 0; i < project.sprints.length; i++) {
        if (id === project.sprints[i].sprintId) {
            delete project.sprints[i];
        }
    }
    for (let i = 0; i < project.backlogs.length; i++) {
        if (id === project.backlogs[i].inSprint) {
            project.backlogs[i].inSprint = null;
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteTasksInBacklog(backlogId) {
    for (let i = 0; i < project.tasks.length; i++) {
        if (backlogId === project.tasks[i].inBacklog) {
            project.tasks.splice(i, 1);
            //Hier müssen keine Referenzen gelöscht werden, da Backlog auch gellöscht wird
        }
    }
    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteTask() {
    let id = document.getElementById("edit_t_item_id").value;
    for (let i = 0; i < project.tasks.length; i++) {
        if (id === project.tasks[i].taskId) {
            //durchsuche alle tasks von allen Backlogs um die zweitreferenz zu löschen
            for (let b = 0; b < project.backlogs.length; b++) {
                for (let t = 0; t < project.backlogs[b].taskIds.length; t++) {
                    if (project.backlogs[b].taskIds[t] === id) {
                        project.backlogs[b].taskIds.splice(t, 1);
                    }
                }
            }
            delete project.tasks[i];
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function displayAddTask() {
    document.getElementById("form_addTask").reset();
    let selectBacklog = document.getElementById("t_item_assign_to_backlog");
    let selectUser = document.getElementById("t_item_assign_to_user");
    $("#t_item_assign_to_user").empty();
    selectUser.options[selectUser.options.length] = new Option("", "");
    for (let i = 0; i < project.assignedUsers.length; i++) {
        let id = project.assignedUsers[i].userId;
        selectUser.options[selectUser.options.length] = new Option("User: " + project.assignedUsers[i].name, id);
    }
    $("#t_item_assign_to_backlog").empty();
    selectBacklog.options[selectBacklog.options.length] = new Option("", "");
    for (let i = 0; i < project.backlogs.length; i++) {
        let id = project.backlogs[i].backlogId;
        selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + project.backlogs[i].title, id);
    }
    let selectStatus = document.getElementById("t_item_status");
    $("#t_item_status").empty();
    selectStatus.options[selectStatus.options.length] = new Option("To Do", "to do", true, true);
    selectStatus.options[selectStatus.options.length] = new Option("In Progress", "in progress");
    selectStatus.options[selectStatus.options.length] = new Option("Done", "done");

    closeChooseItem();
    $("#modal_add_task").modal("show");
}


function addTask() {
    let item_name = document.getElementById("t_item_name").value;
    let item_description = document.getElementById("t_item_description").value;
    let item_estimate_time = document.getElementById("t_item_estimate_time").value;
    let item_assign_to_backlog = document.getElementById("t_item_assign_to_backlog").value;
    let item_assign_to_user = document.getElementById("t_item_assign_to_user").value;
    let selectStatus = document.getElementById("t_item_status").value;


    let newTask = new Task(item_name, item_description, item_estimate_time);
    newTask.status = selectStatus;
    if (item_assign_to_backlog === "") {
        alert("Please Select Backlog");
        return;

    } else {
        newTask.inBacklog = item_assign_to_backlog;

        for (let i = 0; i < project.backlogs.length; i++) {
            if (project.backlogs[i].backlogId === newTask.inBacklog) {
                project.backlogs[i].taskIds.push(newTask.taskId);
            }
        }
        //luc hat probiert
        //project.backlogs.find(x => x.backlogId === item_assign_to_backlog).taskIds.push(newTask.taskId);
    }

    if (item_assign_to_user === "") {
        newTask.assignedTo = null;

    } else {
        newTask.assignedTo = item_assign_to_user;
        //luc hat probiert
        //project.user.find(x => x.userId === item_assign_to_user).assignedTasks.push(newTask.taskId);
        for (let i = 0; i < project.assignedUsers.length; i++) {
            if (project.assignedUsers[i].userId === newTask.assignedTo) {
                project.assignedUsers[i].assignedTasks.push(newTask.taskId);
            }
        }
    }
    if (item_estimate_time === "") {
        alert("Please Select Effort");
        return;
    } else {
        newTask.effort = parseInt(item_estimate_time);
    }

    project.tasks.push(newTask);


    PROJECTS[POSITION] = project;

    syncProjects();
    closeAddTask();

    reload();
}

function closeAddTask() {
    document.getElementById("form_addTask").reset();
    $("#modal_add_task").modal('hide');
}

function displayEditTask(i) {
    document.getElementById("form_edit_task").reset();
    document.getElementById("edit_t_item_name").value = project.tasks[i].title;
    document.getElementById("edit_t_item_description").value = project.tasks[i].description;
    document.getElementById("edit_t_item_estimate_time").value = project.tasks[i].effort;
    document.getElementById("edit_t_item_id").value = project.tasks[i].taskId;
    let selectedBacklog = project.tasks[i].inBacklog;
    let selectedUser = project.tasks[i].assignedTo;

    let selectBacklog = document.getElementById("edit_t_item_assign_to_backlog");
    $("#edit_t_item_assign_to_backlog").empty();
    selectBacklog.options[selectBacklog.options.length] = new Option("", "");
    for (let i = 0; i < project.backlogs.length; i++) {
        let id = project.backlogs[i].backlogId;

        if (selectedBacklog === id) {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + project.backlogs[i].title, id, false, true);
        } else {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + project.backlogs[i].title, id);
        }
    }
    let selectUser = document.getElementById("edit_t_item_assign_to_user");
    $("#edit_t_item_assign_to_user").empty();
    selectUser.options[selectUser.options.length] = new Option("", "");
    for (let i = 0; i < project.assignedUsers.length; i++) {
        let id = project.assignedUsers[i].userId;

        if (selectedUser === id) {
            selectUser.options[selectUser.options.length] = new Option("User: " + project.assignedUsers[i].name, id, false, true);
        } else {
            selectUser.options[selectUser.options.length] = new Option("User: " + project.assignedUsers[i].name, id);
        }
    }
    let selectStatus = document.getElementById("edit_t_item_status");
    $("#edit_t_item_status").empty();
    if (project.tasks[i].status === "to do") {
        selectStatus.options[selectStatus.options.length] = new Option("To Do", "to do", true, true);
        selectStatus.options[selectStatus.options.length] = new Option("In Progress", "in progress");
        selectStatus.options[selectStatus.options.length] = new Option("Done", "done");
    }
    if (project.tasks[i].status === "in progress") {
        selectStatus.options[selectStatus.options.length] = new Option("To Do", "to do");
        selectStatus.options[selectStatus.options.length] = new Option("In Progress", "in progress", true, true);
        selectStatus.options[selectStatus.options.length] = new Option("Done", "done");
    }
    if (project.tasks[i].status === "done") {
        selectStatus.options[selectStatus.options.length] = new Option("To Do", "to do");
        selectStatus.options[selectStatus.options.length] = new Option("In Progress", "in progress");
        selectStatus.options[selectStatus.options.length] = new Option("Done", "done", true, true);
    }


    $("#modal_edit_task").modal("show");
}


function saveTask() {
    let item_name = document.getElementById("edit_t_item_name").value;
    let item_description = document.getElementById("edit_t_item_description").value;
    let item_estimate_time = document.getElementById("edit_t_item_estimate_time").value;
    let item_assign_to_backlog = document.getElementById("edit_t_item_assign_to_backlog").value;
    let item_assign_to_user = document.getElementById("edit_t_item_assign_to_user").value;
    let item_id = document.getElementById("edit_t_item_id").value;
    let item_status = document.getElementById("edit_t_item_status").value;

    for (let i = 0; i < project.tasks.length; i++) {

        if (project.tasks[i].taskId == item_id) {
            project.tasks[i].title = item_name;
            project.tasks[i].description = item_description;
            project.tasks[i].effort = item_estimate_time;
            project.tasks[i].status = item_status;
            if (item_assign_to_backlog === "") {
                alert("Please Select Backlog");
                return;

            } else {
                project.tasks[i].inBacklog = "" + item_assign_to_backlog;
            }

            if (item_assign_to_user === "") {
                project.tasks[i].assignedTo = null;

            } else {
                project.tasks[i].assignedTo = "" + item_assign_to_user;
            }
            if (item_estimate_time === "") {
                alert("Please Select Effort");
                return;
            } else {
                project.tasks[i].effort = parseInt(item_estimate_time);
            }
        }
    }
    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
    closeEditTask();
}

function closeEditTask() {
    document.getElementById("form_edit_task").reset();
    $("#modal_edit_task").modal("hide");
}

function listTasksOfBacklog(backlogId) {
    let taskTable = document.getElementById("task_table_body");
    taskTable.innerHTML = "";

    for (let i = 0; i < project.tasks.length; i++) {

        if (project.tasks[i].inBacklog === backlogId) {
            let taskRow = document.createElement("tr");
            taskRow.onclick = function () {
                displayEditTask(i);
            };

            let colTitle = document.createElement("td");
            let title = document.createTextNode(project.tasks[i].title);
            colTitle.appendChild(title);
            taskRow.appendChild(colTitle);


            let colStatus = document.createElement("td");
            let status = document.createTextNode(project.tasks[i].status);
            colStatus.appendChild(status);
            taskRow.appendChild(colStatus);

            let colEstimate = document.createElement("td");
            let estimate = document.createTextNode(project.tasks[i].effort);
            colEstimate.appendChild(estimate);
            taskRow.appendChild(colEstimate);


            taskTable.appendChild(taskRow);
        }
    }

}