const fs = require('fs');
const path = require('path');
const {
    ipcRenderer
} = require('electron');

const BacklogItem = require('../app/Models/backlog-item.js');
const EpicCapture = require('../app/Models/epic-capture');
const Task = require('../app/Models/task');
//const Sprint = require('../app/Models/sprint');

let PROJECTS;
let project;
let POSITION = fs.readFileSync(path.join(__dirname, '../data/global/POSITION.json'));


ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
    listEpicCapturesWithBacklogs();
})

ipcRenderer.send("reqPROJECTS");


function reload() {
    location.reload();

}
//Lists Site Content
function listEpicCapturesWithBacklogs() {
    //$("#productbacklog_table").tbody.empty();
    //calculateEpicEffort(project);
    let epic;
    let backlogTable = document.getElementById("productbacklog_table");

    //console.log("EpicCaptures Länge " + project.epics.length);
    for (let i = 0; i < project.epics.length; i++) {
        epic = project.epics[i];
        //console.log("Epic " + epic.epicId + " on Position " + i);
        let backlog;

        let epicRow = document.createElement("tr");
        epicRow.onclick = function () {
            displayEditEpicCapture(i);
        };
        epicRow.style.backgroundColor = "DarkGray";

        let colIsEpic = document.createElement("td");
        let isEpic = document.createTextNode("EPIC");
        colIsEpic.appendChild(isEpic);
        epicRow.appendChild(colIsEpic);

        /*
        let colId = document.createElement("td");
        let id = document.createTextNode(project.epics[i].epicId);
        colId.appendChild(id);
        epicRow.appendChild(colId);
        */

        let colTitle = document.createElement("td");
        let title = document.createTextNode(project.epics[i].title);
        colTitle.appendChild(title);
        epicRow.appendChild(colTitle);

        let colEstimate = document.createElement("td");
        let estimate = document.createTextNode(project.epics[i].estimated);
        colEstimate.appendChild(estimate);
        epicRow.appendChild(colEstimate);

        let colStatus = document.createElement("td");
        let status;
        if (project.epics[i].epic_status === "to do") {
            status = document.createTextNode("To Do");
        } else if (project.epics[i].epic_status === "in progress") {
            status = document.createTextNode("In progress");
        } else if (project.epics[i].epic_status === "done") {
            status = document.createTextNode("Done");
        } else {
            status = document.createTextNode("Missing");
        }
        colStatus.appendChild(status);
        epicRow.appendChild(colStatus);

        backlogTable.appendChild(epicRow);
        for (let b = 0; project.backlogs.length > b; b++) {
            if (project.backlogs[b].inEpic === project.epics[i].epicId) {
                let backlogRow = document.createElement("tr");
                backlogRow.onclick = function () {
                    displayEditBacklogItem(b);
                };

                backlogRow.style.backgroundColor = "Gainsboro";

                let colIsEpic = document.createElement("td");
                let isEpic = document.createTextNode("");
                colIsEpic.appendChild(isEpic);
                backlogRow.appendChild(colIsEpic);

                /*
                let colId = document.createElement("td");
                let id = document.createTextNode(project.backlogs[b].backlogId);
                colId.appendChild(id);
                backlogRow.appendChild(colId);
                */

                let colTitle = document.createElement("td");
                let title = document.createTextNode(project.backlogs[b].title);
                colTitle.appendChild(title);
                backlogRow.appendChild(colTitle);

                let colEstimate = document.createElement("td");
                let estimate = document.createTextNode(project.backlogs[b].estimated);
                colEstimate.appendChild(estimate);
                backlogRow.appendChild(colEstimate);

                let colStatus = document.createElement("td");
                let status;
                if (project.backlogs[b].backlog_status === "to do") {
                    status = document.createTextNode("To Do");
                } else if (project.backlogs[b].backlog_status === "in progress") {
                    status = document.createTextNode("In progress");
                } else if (project.backlogs[b].backlog_status === "done") {
                    status = document.createTextNode("Done");
                } else {
                    status = document.createTextNode("Missing");
                }
                colStatus.appendChild(status);
                backlogRow.appendChild(colStatus);

                backlogTable.appendChild(backlogRow);
            }
        }
    }


    for (let i = 0; i < project.backlogs.length; i++) {
        if (project.backlogs[i].inEpic === null) {
            let backlogRow = document.createElement("tr");
            backlogRow.onclick = function () {
                displayEditBacklogItem(i);
            };

            backlogRow.style.backgroundColor = "PowderBlue";

            let colIsEpic = document.createElement("td");
            let isEpic = document.createTextNode("BACKLOG");
            colIsEpic.appendChild(isEpic);
            backlogRow.appendChild(colIsEpic);

            /*
            let colId = document.createElement("td");
            let id = document.createTextNode(project.backlogs[i].backlogId);
            colId.appendChild(id);
            backlogRow.appendChild(colId);
            */

            let colTitle = document.createElement("td");
            let title = document.createTextNode(project.backlogs[i].title);
            colTitle.appendChild(title);
            backlogRow.appendChild(colTitle);

            let colEstimate = document.createElement("td");
            let estimate = document.createTextNode(project.backlogs[i].estimated);
            colEstimate.appendChild(estimate);
            backlogRow.appendChild(colEstimate);

            let colStatus = document.createElement("td");
            let status;
            if (project.backlogs[i].backlog_status === "to do") {
                status = document.createTextNode("To Do");
            } else if (project.backlogs[i].backlog_status === "in progress") {
                status = document.createTextNode("In Progress");
            } else if (project.backlogs[i].backlog_status === "done") {
                status = document.createTextNode("Done");
            } else {
                status = document.createTextNode("Missing");
            }
            colStatus.appendChild(status);
            backlogRow.appendChild(colStatus);

            backlogTable.appendChild(backlogRow);

        }
    }
}

//Lists Tasks of Backlog Item
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

function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);

}

//Copy all the following Methods from this to your js

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
                project.backlogs[i].inSprint = null;
                //TODO: Zweit Referenz löschen

            } else {
                //Sprint zugewiesen
                project.backlogs[i].inSprint = item_assign_to_sprint;
                project.sprints.find(x => x.sprintId === item_assign_to_sprint).backlogs.push(item_id);
                //TODO: Alt Referenz löschen
            }

            if (item_assign_to_epic === "") {
                //Kein Epic zugewiesen
                project.backlogs[i].inEpic = null;
                //TODO: Zweit Referenz löschen

            } else {
                //Epic zugewiesen
                project.backlogs[i].inEpic = item_assign_to_epic;
                project.epics.find(x => x.epicId === item_assign_to_epic).backlogs.push(item_id);
                //TODO: Alt Referenz löschen
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
    console.log("Delete Backlogs ID " + id);

    for (let i = 0; i < project.backlogs.length; i++) {
        if (id === project.backlogs[i].backlogId) {
            console.log("deleteTasksinBacklog aufgerufen für Backlog ID" + id);
            deleteTasksInBacklog(id);
            console.log("Delete Backlog Item mit Backlog ID " + id);
            delete project.backlogs[i];
            //TODO: DELETE Zweit Referenz vom zu löschenden Backlog
        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteBacklogsInEpic(epicId) {
    console.log("Delete Backlogs in Epic ID " + epicId);
    let counter = project.backlogs.length;
    //let toDelete = [];
    for (let i = 0; i < counter; i++) {
        console.log("INFO: Backlog mit ID " + project.backlogs[i].backlogId + " is in Epic: " + project.backlogs[i].inEpic);
        if (epicId === project.backlogs[i].inEpic) {
            console.log("delete Tasks in Backlog ID" + project.backlogs[i].backlogId);
            deleteTasksInBacklog(project.backlogs[i].backlogId);
            console.log("Delete Backlog Item mit Backlog ID " + project.backlogs[i].backlogId);
            delete project.backlogs[i];
            //TODO: DELETE Zweit Referenz vom zu löschenden Backlog

        }
    }

    PROJECTS[POSITION] = project;

    syncProjects();
    reload();
}

function deleteEpicCapture() {
    let id = document.getElementById("edit_e_item_id").value;
    console.log("Delete Epic ID " + id);
    for (let i = 0; i < project.epics.length; i++) {
        if (id === project.epics[i].epicId) {
            console.log("Delete Backlogs in Epic mit ID " + project.backlogs[i].backlogId);
            deleteBacklogsInEpic(id);
            console.log("Delete Epic mit ID" + id);
            delete project.epics[i];
            //TODO: DELETE Zweit Referenz vom zu löschenden Epic
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
            console.log("Delete Sprint ID " + id);
            //TODO: Zweit Referenz löschen
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
            console.log("Delete Tasks mit ID" + project.tasks[i].taskId);
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
            //console.log("Delete Task mit " + id);
            //durchsuche alle tasks von allen Backlogs um die zweitreferenz zu löschen
            for (let b = 0; b < project.backlogs.length; b++) {
                //console.log("backlog: " + b);
                for (let t = 0; t < project.backlogs[b].taskIds.length; t++) {
                    console.log("task: " + t);
                    if (project.backlogs[b].taskIds[t] === id) {
                        project.backlogs[b].taskIds.splice(t, 1);
                        console.log("Spliced");
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

    console.log("The task was added! " + item_name + " " + item_description + " " + item_estimate_time);
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
    //document.getElementById("edit_t_item_status").value = project.tasks[i].status;
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
            console.log("Item gefunden");
            project.tasks[i].title = item_name;
            project.tasks[i].description = item_description;
            project.tasks[i].effort = item_estimate_time;
            project.tasks[i].status = item_status;
            if (item_assign_to_backlog === "") {
                //project.tasks[i].inBacklog = null;
                alert("Please Select Backlog");
                return;

            } else {
                project.tasks[i].inBacklog = "" + item_assign_to_backlog;
                //luc hat probiert
                //project.backlogs.find(x => x.backlogId === item_assign_to_backlog).taskIds.push(item_id);
                //TODO: Alte zweitreferenzen löschen vom "abgewählten Obekt" und neue zweit referenz hinzufpgen
            }

            if (item_assign_to_user === "") {
                project.tasks[i].assignedTo = null;
                //TODO: Zweit Referenz löschen

            } else {
                project.tasks[i].assignedTo = "" + item_assign_to_user;
                //luc hat probiert
               // project.user.find(x => x.userId === item_assign_to_user).assignedTasks.push(item_id);
                //TODO: Alte zweitreferenzen löschen vom "abgewählten Obekt" und neue zweit referenz hinzufügen
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

//Copy to this
