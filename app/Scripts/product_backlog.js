const fs = require('fs');
const path = require('path');
const {
    BrowserWindow,
    remote,
    ipcRenderer
} = require('electron');
const BacklogItem = require('../app/Models/backlog-item.js');
const EpicCapture = require('../app/Models/epic-capture');
const Task = require('../app/Models/task');

let PROJECTS;
let jsonFile;
let POSITION = fs.readFileSync('data/global/POSITION.json');


ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    jsonFile = PROJECTS[POSITION]
    listEpicCapturesWithBacklogs();
})

ipcRenderer.send("reqPROJECTS");

/*
ipcRenderer.on("loadProjects", function (event, projects) {
    //PROJECTS = projects;
    jsonFile = PROJECTS[POSITION];
    console.log("got projects");


})
*/

//HTML parent <table> ID
var table = document.getElementById("productbacklog_table");

function reload() {
    location.reload();

}

function listEpicCapturesWithBacklogs() {
    //$("#productbacklog_table").tbody.empty();
    //calculateEpicEffort(jsonFile);
    let epic;
    let backlogTable = document.getElementById("productbacklog_table");

    //console.log("EpicCaptures Länge " + jsonFile.epics.length);
    for (let i = 0; i < jsonFile.epics.length; i++) {
        epic = jsonFile.epics[i];
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
        let id = document.createTextNode(jsonFile.epics[i].epicId);
        colId.appendChild(id);
        epicRow.appendChild(colId);
        */

        let colTitle = document.createElement("td");
        let title = document.createTextNode(jsonFile.epics[i].title);
        colTitle.appendChild(title);
        epicRow.appendChild(colTitle);

        let colEstimate = document.createElement("td");
        let estimate = document.createTextNode(jsonFile.epics[i].estimated);
        colEstimate.appendChild(estimate);
        epicRow.appendChild(colEstimate);

        let colStatus = document.createElement("td");
        let status;
        if (jsonFile.epics[i].epic_status === "to do") {
            status = document.createTextNode("To Do");
        } else if (jsonFile.epics[i].epic_status === "in progress") {
            status = document.createTextNode("In progress");
        } else if (jsonFile.epics[i].epic_status === "done") {
            status = document.createTextNode("Done");
        } else {
            status = document.createTextNode("Missing");
        }
        colStatus.appendChild(status);
        epicRow.appendChild(colStatus);

        backlogTable.appendChild(epicRow);
        //console.log("Backlogs in Epic Länge " + jsonFile.backlogs.length);
        for (let b = 0; jsonFile.backlogs.length > b; b++) {
            //console.log("Backlog ID " + jsonFile.backlogs[b].backlogId + " Position: " + b);
            if (jsonFile.backlogs[b].inEpic === jsonFile.epics[i].epicId) {
                //console.log("Epic mit Backlog ID gefunden " + jsonFile.backlogs[b].backlogId + " Position: " + b)
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
                let id = document.createTextNode(jsonFile.backlogs[b].backlogId);
                colId.appendChild(id);
                backlogRow.appendChild(colId);
                */

                let colTitle = document.createElement("td");
                let title = document.createTextNode(jsonFile.backlogs[b].title);
                colTitle.appendChild(title);
                backlogRow.appendChild(colTitle);

                let colEstimate = document.createElement("td");
                let estimate = document.createTextNode(jsonFile.backlogs[b].estimated);
                colEstimate.appendChild(estimate);
                backlogRow.appendChild(colEstimate);

                let colStatus = document.createElement("td");
                let status;
                if (jsonFile.backlogs[b].backlog_status === "to do") {
                    status = document.createTextNode("To Do");
                } else if (jsonFile.backlogs[b].backlog_status === "in progress") {
                    status = document.createTextNode("In progress");
                } else if (jsonFile.backlogs[b].backlog_status === "done") {
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


    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        if (jsonFile.backlogs[i].inEpic === null) {
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
            let id = document.createTextNode(jsonFile.backlogs[i].backlogId);
            colId.appendChild(id);
            backlogRow.appendChild(colId);
            */

            let colTitle = document.createElement("td");
            let title = document.createTextNode(jsonFile.backlogs[i].title);
            colTitle.appendChild(title);
            backlogRow.appendChild(colTitle);

            let colEstimate = document.createElement("td");
            let estimate = document.createTextNode(jsonFile.backlogs[i].estimated);
            colEstimate.appendChild(estimate);
            backlogRow.appendChild(colEstimate);

            let colStatus = document.createElement("td");
            let status;
            if (jsonFile.backlogs[i].backlog_status === "to do") {
                status = document.createTextNode("To Do");
            } else if (jsonFile.backlogs[i].backlog_status === "in progress") {
                status = document.createTextNode("In Progress");
            } else if (jsonFile.backlogs[i].backlog_status === "done") {
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

function listTasksOfBacklog(backlogId) {
    let taskTable = document.getElementById("task_table_body");
    taskTable.innerHTML = "";

    /*
    let columnRow = document.createElement("tr");
    columnRow.appendChild(document.createTextNode("Title"));
    columnRow.appendChild(document.createTextNode("Effort"));
    columnRow.appendChild(document.createTextNode("Status"));
    taskTable.appendChild(columnRow);
    */

    for (let i = 0; i < jsonFile.tasks.length; i++) {

        if (jsonFile.tasks[i].inBacklog === backlogId) {
            let taskRow = document.createElement("tr");
            taskRow.onclick = function () {
                displayEditTask(i);
            };

            let colTitle = document.createElement("td");
            let title = document.createTextNode(jsonFile.tasks[i].title);
            colTitle.appendChild(title);
            taskRow.appendChild(colTitle);


            let colStatus = document.createElement("td");
            let status = document.createTextNode(jsonFile.tasks[i].status);
            colStatus.appendChild(status);
            taskRow.appendChild(colStatus);

            let colEstimate = document.createElement("td");
            let estimate = document.createTextNode(jsonFile.tasks[i].effort);
            colEstimate.appendChild(estimate);
            taskRow.appendChild(colEstimate);


            taskTable.appendChild(taskRow);
        }
    }

}

/*
function calculateEpicEffort(project){
    if(project.epics.length != 0){
        project.epics.forEach(iterateEpics);

        function iterateEpics(value, index, array){
            let count = 0;
            value.backlogs.forEach(aggregateEffort);

            function aggregateEffort(value, index, array){
                count = count + project.backlogs.find(backlog => backlog.backlogId === value).estimated;
            }
            project.epics[index].estimated = count;
        }
    }
    else {
        return;
    }
}
*/

function displayChooseItem() {
    $("#modal_chooseItem").modal("show");

}

function closeChooseItem() {
    $("#modal_chooseItem").modal("hide");
}

function displayAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    let selectSprint = document.getElementById("b_item_assign_to_sprint");
    let selectEpic = document.getElementById("b_item_assign_to_epic");
    $("#b_item_assign_to_sprint").empty();
    selectSprint.options[selectSprint.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.sprints.length; i++) {
        let id = jsonFile.sprints[i].sprintId;
        selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + jsonFile.sprints[i].name, id);
    }
    $("#b_item_assign_to_epic").empty();
    selectEpic.options[selectEpic.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.epics.length; i++) {
        let id = jsonFile.epics[i].epicId;
        selectEpic.options[selectEpic.options.length] = new Option("Epic: " + jsonFile.epics[i].title, id);
    }
    closeChooseItem();
    $("#modal_add_backlogItem").modal("show");
}

function addBacklogItem() {
    let item_name = document.getElementById("b_item_name").value;
    let item_description = document.getElementById("b_item_description").value;
    let item_estimate_time = document.getElementById("b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("b_item_assign_to_sprint").value;
    let item_assign_to_epic = document.getElementById("b_item_assign_to_epic").value;
    //console.log("The backlog item was added! " + item_name + " " + item_description + " " + item_estimate_time);

    let tmpBLitem = new BacklogItem(item_name, item_description, item_estimate_time);
    if (item_assign_to_epic === "") {
        tmpBLitem.inEpic = null;
        //TODO: BacklogItem Referenzen updaten

    } else {
        tmpBLitem.inEpic = item_assign_to_epic;
        //TODO: BacklogItem Referenzen updaten
    }

    if (item_assign_to_sprint === "") {
        tmpBLitem.inSprint = null;
        //TODO: BacklogItem Referenzen updaten

    } else {
        tmpBLitem.inSprint = item_assign_to_sprint;
        //TODO: BacklogItem Referenzen updaten
    }


    jsonFile.backlogs.push(tmpBLitem);

    PROJECTS[POSITION] = jsonFile;

    syncProjects();

    //console.log(JSON.stringify(PROJECTS[POSITION].backlogs[PROJECTS[POSITION].backlogs.length - 1], null, 2))

    closeAddBacklogItem();

    reload();
}

function closeAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    $("#modal_add_backlogItem").modal('hide');
}

function displayEditBacklogItem(i) {
    document.getElementById("form_edit_BacklogItem").reset();
    document.getElementById("edit_b_item_name").value = jsonFile.backlogs[i].title;
    document.getElementById("edit_b_item_description").value = jsonFile.backlogs[i].description;
    document.getElementById("edit_b_item_estimate_time").value = jsonFile.backlogs[i].estimated;
    document.getElementById("edit_b_item_id").value = jsonFile.backlogs[i].backlogId;
    document.getElementById("edit_b_item_epicId").value = jsonFile.backlogs[i].inEpic;
    let selectedEpic = jsonFile.backlogs[i].inEpic;
    document.getElementById("edit_b_item_sprintId").value = jsonFile.backlogs[i].inSprint;
    let selectedSprint = jsonFile.backlogs[i].inSprint;

    let selectSprint = document.getElementById("edit_b_item_assign_to_sprint");
    $("#edit_b_item_assign_to_sprint").empty();
    selectSprint.options[selectSprint.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.sprints.length; i++) {
        let id = jsonFile.sprints[i].sprintId;

        if (selectedSprint === id) {
            selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + jsonFile.sprints[i].name, id, false, true);
        } else {
            selectSprint.options[selectSprint.options.length] = new Option("Sprint: " + jsonFile.sprints[i].name, id);
        }
    }
    let selectEpic = document.getElementById("edit_b_item_assign_to_epic");
    $("#edit_b_item_assign_to_epic").empty();
    selectEpic.options[selectEpic.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.epics.length; i++) {
        let id = jsonFile.epics[i].epicId;

        if (selectedEpic === id) {
            selectEpic.options[selectEpic.options.length] = new Option("Epic: " + jsonFile.epics[i].title, id, false, true);
        } else {
            selectEpic.options[selectEpic.options.length] = new Option("Epic: " + jsonFile.epics[i].title, id);
        }
    }

    listTasksOfBacklog(jsonFile.backlogs[i].backlogId);
    $("#modal_edit_backlogItem").modal("show");
}

function saveBacklogItem() {
    let item_name = document.getElementById("edit_b_item_name").value;
    let item_description = document.getElementById("edit_b_item_description").value;
    let item_estimate_time = document.getElementById("edit_b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("edit_b_item_assign_to_sprint").value;
    let item_assign_to_epic = document.getElementById("edit_b_item_assign_to_epic").value;
    let item_id = document.getElementById("edit_b_item_id").value;

    //console.log("Sprint "+ item_assign_to_sprint);
    //console.log("Epic "+ item_assign_to_epic);
    for (let i = 0; i < jsonFile.backlogs.length; i++) {

        if (jsonFile.backlogs[i].backlogId === item_id) {
            //console.log("Item gefunden");
            jsonFile.backlogs[i].title = item_name;
            jsonFile.backlogs[i].description = item_description;
            jsonFile.backlogs[i].estimated = item_estimate_time;
            if (item_assign_to_sprint === "") {
                //Kein Sprint zugewiesen
                jsonFile.backlogs[i].inSprint = null;
                //TODO: Backlog Item Referenzen suchen und updaten

            } else {
                //Sprint zugewiesen
                jsonFile.backlogs[i].inSprint = "" + item_assign_to_sprint;
                //TODO: Backlog Item Referenzen suchen und updaten
            }

            if (item_assign_to_epic === "") {
                //Kein Epic zugewiesen
                jsonFile.backlogs[i].inEpic = null;
                //TODO: Backlog Item Referenzen suchen und updaten

            } else {
                //Epic zugewiesen
                jsonFile.backlogs[i].inEpic = item_assign_to_epic;
                //TODO: Backlog Item Referenzen suchen und updaten
            }
        }
    }
    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    //listEpicCapturesWithBacklogs();
    reload();
    closeEditBacklogItem();
}

function closeEditBacklogItem() {
    document.getElementById("form_edit_BacklogItem").reset();
    $("#modal_edit_backlogItem").modal("hide");
}

function displayAddEpicCapture() {
    document.getElementById("form_addEpicCapture").reset();
    closeChooseItem();
    $("#modal_add_epicCapture").modal("show");
}

function addEpicCapture() {
    let item_name = document.getElementById("e_item_name").value;
    let item_description = document.getElementById("e_item_description").value;
    let item_estimate_time = document.getElementById("e_item_estimate_time").value;

    //console.log("The Epic Capture was added! " + item_name + " " + item_description + " " + item_estimate_time);
    let epicCapture = new EpicCapture(item_name, item_description, "high", "high", item_estimate_time);
    //console.log(epicCapture);

    jsonFile.epics.push(epicCapture);

    PROJECTS[POSITION] = jsonFile;

    syncProjects();


    closeAddEpicCapture();
    reload();
}

function closeAddEpicCapture() {
    $("#modal_add_epicCapture").modal('hide');
}

function displayEditEpicCapture(i) {

    document.getElementById("form_edit_epicCapture").reset();
    document.getElementById("edit_e_item_name").value = jsonFile.epics[i].title;
    document.getElementById("edit_e_item_description").value = jsonFile.epics[i].description;
    document.getElementById("edit_e_item_estimate_time").value = jsonFile.epics[i].estimated;
    document.getElementById("edit_e_item_id").value = jsonFile.epics[i].epicId;
    $("#modal_edit_epicCapture").modal("show");
}

function saveEpicCapture() {
    let item_name = document.getElementById("edit_e_item_name").value;
    let item_description = document.getElementById("edit_e_item_description").value;
    let item_estimate_time = document.getElementById("edit_e_item_estimate_time").value;
    let item_id = document.getElementById("edit_e_item_id").value;

    for (let i = 0; i < jsonFile.epics.length; i++) {
        if (jsonFile.epics[i].epicId == item_id) {
            //console.log("Item gefunden");
            jsonFile.epics[i].title = item_name;
            jsonFile.epics[i].description = item_description;
            jsonFile.epics[i].estimated = item_estimate_time;
            //console.log("Item Edited" + jsonFile.epics[i]);
            reload();
        }
    }
    PROJECTS[POSITION] = jsonFile;

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

function addSprint() {
    let sprint_name = document.getElementById("s_name").value;
    let sprint_startdate = document.getElementById("s_startdate").value;
    let sprint_enddate = document.getElementById("s_enddate").value;
    let sprint_capacity = document.getElementById("s_capacity").value;

    console.log("The Sprint was added! " + sprint_name + " " + sprint_startdate + " " + sprint_enddate + " " + sprint_capacity);
    let sprint1;
    sprint1 = new Sprint(sprint_name, sprint_startdate, sprint_enddate, sprint_capacity);

    jsonFile.sprints.push(sprint1);

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    //console.log(sprint1);
    reload();
    closeAddSprint();
    displayEditSprint(jsonFile.sprints.length-1);
}

function displayEditSprint(s) {
    document.getElementById("form_editSprint").reset();
    document.getElementById("edit_s_name").value = jsonFile.sprints[s].name;
    document.getElementById("edit_s_startdate").value = jsonFile.sprints[s].startdate;
    document.getElementById("edit_s_enddate").value = jsonFile.sprints[s].enddate;
    document.getElementById("edit_s_capacity").value = jsonFile.sprints[s].capacity;
    document.getElementById("edit_s_item_id").value = jsonFile.sprints[s].sprintId;

    $("#modal_edit_sprint").modal("show");
}

function saveSprint() {
    let sprint_name = document.getElementById("s_name").value;
    let sprint_startdate = document.getElementById("s_startdate").value;
    let sprint_enddate = document.getElementById("s_enddate").value;
    let sprint_capacity = document.getElementById("s_capacity").value;
    let sprint_id = document.getElementById("edit_s_item_id").value;

    for (let i = 0; i < jsonFile.sprints.length; i++) {
        if (jsonFile.sprints[i].sprintId == sprint_id) {
            jsonFile.sprints[i].name = sprint_name;
            jsonFile.sprints[i].startdate = sprint_startdate;
            jsonFile.sprints[i].enddate = sprint_enddate;

            jsonFile.sprints[i].capacity = sprint_capacity;
            //console.log("Item Edited" + jsonFile.sprints[i]);

        }
    }

    PROJECTS[POSITION] = jsonFile;

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

    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        if (id === jsonFile.backlogs[i].backlogId) {
            deleteTasksInBacklog(id);
            delete jsonFile.backlogs[i];
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}



function deleteBacklogsInEpic(epicId) {
    //TODO: Safe Delete
    console.log("Delete Backlogs in Epic ID " + epicId);
    let counter = jsonFile.backlogs.length;
    //let toDelete = [];
    for (let i = 0; i < counter; i++) {
        console.log("INFO: Backlog mit ID " + jsonFile.backlogs[i].backlogId + " is in Epic: " + jsonFile.backlogs[i].inEpic);
        if (epicId === jsonFile.backlogs[i].inEpic) {
            deleteTasksInBacklog(jsonFile.backlogs[i].backlogId);
            //toDelete.append(jsonFile.backlogs[i].backlogId);
            delete jsonFile.backlogs[i];
            //i = i - 2;
            //counter = counter - 2;
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}

function deleteEpicCapture() {
    let id = document.getElementById("edit_e_item_id").value;
    console.log("Delete Epic ID " + id);
    for (let i = 0; i < jsonFile.epics.length; i++) {
        if (id === jsonFile.epics[i].epicId) {
            deleteBacklogsInEpic(id);
            delete jsonFile.epics[i];
        }
    }
    deleteBacklogsInEpic(id);

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}

function deleteSprint() {
    let id = document.getElementById("edit_s_item_id").value;
    console.log("Delete Sprint ID " + id);
    for (let i = 0; i < jsonFile.sprints.length; i++) {
        if (id === jsonFile.sprints[i].sprintId) {
            delete jsonFile.sprints[i];
        }
    }
    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        if (id === jsonFile.backlogs[i].inSprint) {
            jsonFile.backlogs[i].inSprint = null;
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}

function deleteTasksInBacklog(backlogId) {
    console.log("Delete Task in Backlog ID " + backlogId);

    for (let i = 0; i < jsonFile.tasks.length; i++) {
        if (backlogId === jsonFile.tasks[i].inBacklog) {
            delete jsonFile.tasks[i];
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}

function deleteTask() {
    let id = document.getElementById("edit_t_item_id").value;
    console.log("Delete Task " + id);
    for (let i = 0; i < jsonFile.tasks.length; i++) {
        if (id === jsonFile.tasks[i].taskId) {
            delete jsonFile.tasks[i];
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    reload();
}

function displayAddTask() {
    document.getElementById("form_addTask").reset();
    let selectBacklog = document.getElementById("t_item_assign_to_backlog");
    let selectUser = document.getElementById("t_item_assign_to_user");
    $("#t_item_assign_to_user").empty();
    selectUser.options[selectUser.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.assignedUsers.length; i++) {
        let id = jsonFile.assignedUsers[i].userId;
        selectUser.options[selectUser.options.length] = new Option("User: " + jsonFile.assignedUsers[i].name, id);
    }
    $("#t_item_assign_to_backlog").empty();
    selectBacklog.options[selectBacklog.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        let id = jsonFile.backlogs[i].backlogId;
        selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + jsonFile.backlogs[i].title, id);
    }
    //TODO: LUC: Status Select dynamisch Füllen
    closeChooseItem();
    $("#modal_add_task").modal("show");
}

function addTask() {
    let item_name = document.getElementById("t_item_name").value;
    let item_description = document.getElementById("t_item_description").value;
    let item_estimate_time = document.getElementById("t_item_estimate_time").value;
    let item_assign_to_backlog = document.getElementById("t_item_assign_to_backlog").value;
    let item_assign_to_user = document.getElementById("t_item_assign_to_user").value;


    let newTask = new Task (item_name, item_description, item_estimate_time);
    if (item_assign_to_backlog === "") {
        //newTask.inBacklog = null;
        alert("Please Select Backlog");
        return;

    } else {
        newTask.inBacklog = item_assign_to_backlog;
    }

    if (item_assign_to_user === "") {
        newTask.assignedTo = null;

    } else {
        newTask.assignedTo = item_assign_to_user;
    }

    console.log("The task was added! " + item_name + " " + item_description + " " + item_estimate_time);
    jsonFile.tasks.push(newTask);
    //funktioniert
    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        if (jsonFile.backlogs[i].backlogId === newTask.inBacklog) {
            //jsonFile.backlogs[i].addTask(newTask);
            jsonFile.backlogs[i].taskIds.push(newTask.taskId);
            //console.log((JSON.stringify(jsonFile, null, 2)));
        }
    }

    PROJECTS[POSITION] = jsonFile;

    syncProjects();

    //console.log(JSON.stringify(PROJECTS[POSITION].backlogs[PROJECTS[POSITION].backlogs.length - 1], null, 2))

    closeAddBacklogItem();

    reload();
}

function closeAddTask() {
    document.getElementById("form_addTask").reset();
    $("#modal_add_task").modal('hide');
}

function displayEditTask(i) {
    document.getElementById("form_edit_task").reset();
    document.getElementById("edit_t_item_name").value = jsonFile.tasks[i].title;
    document.getElementById("edit_t_item_description").value = jsonFile.tasks[i].description;
    document.getElementById("edit_t_item_estimate_time").value = jsonFile.tasks[i].effort;
    document.getElementById("edit_t_item_id").value = jsonFile.tasks[i].taskId;
    //document.getElementById("edit_t_item_assign_to_backlog").value = jsonFile.tasks[i].inBacklog;
    let selectedBacklog = jsonFile.tasks[i].inBacklog;
    //document.getElementById("edit_t_item_assign_to_user").value = jsonFile.tasks[i].assignedTo;
    let selectedUser = jsonFile.tasks[i].assignedTo;

    let selectBacklog = document.getElementById("edit_t_item_assign_to_backlog");
    $("#edit_t_item_assign_to_backlog").empty();
    selectBacklog.options[selectBacklog.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        let id = jsonFile.backlogs[i].backlogId;

        if (selectedBacklog === id) {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + jsonFile.backlogs[i].title, id, false, true);
        } else {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + jsonFile.backlogs[i].title, id);
        }
    }
    let selectUser = document.getElementById("edit_t_item_assign_to_user");
    $("#edit_t_item_assign_to_user").empty();
    selectUser.options[selectUser.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.assignedUsers.length; i++) {
        let id = jsonFile.assignedUsers[i].userId;

        if (selectedUser === id) {
            selectUser.options[selectUser.options.length] = new Option("User: " + jsonFile.assignedUsers[i].name, id, false, true);
        } else {
            selectUser.options[selectUser.options.length] = new Option("User: " + jsonFile.assignedUsers[i].name, id);
        }
    }

    //TODO: LUC: Status Select dynamisch Füllen

    $("#modal_edit_task").modal("show");
}

function saveTask() {
    let item_name = document.getElementById("edit_t_item_name").value;
    let item_description = document.getElementById("edit_t_item_description").value;
    let item_estimate_time = document.getElementById("edit_t_item_estimate_time").value;
    let item_assign_to_backlog = document.getElementById("edit_t_item_assign_to_backlog").value;
    let item_assign_to_user = document.getElementById("edit_t_item_assign_to_user").value;
    let item_id = document.getElementById("edit_t_item_id").value;

    console.log("Backlog "+ item_assign_to_backlog);
    console.log("User "+ item_assign_to_user);
    for (let i = 0; i < jsonFile.backlogs.length; i++) {

        if (jsonFile.tasks[i].taskId === item_id) {
            console.log("Item gefunden");
            jsonFile.tasks[i].title = item_name;
            jsonFile.tasks[i].description = item_description;
            jsonFile.tasks[i].effort = item_estimate_time;
            if (item_assign_to_backlog === "") {
                //jsonFile.tasks[i].inBacklog = null;
                alert("Please Select Backlog");
                return;

            } else {
                jsonFile.tasks[i].inBacklog = "" + item_assign_to_backlog;
            }

            if (item_assign_to_user === "") {
                jsonFile.tasks[i].assignedTo = null;

            } else {
                jsonFile.tasks[i].assignedTo = "" + item_assign_to_user;
            }
        }
    }
    PROJECTS[POSITION] = jsonFile;

    syncProjects();
    //listEpicCapturesWithBacklogs();
    reload();
    closeEditTask();
}

function closeEditTask() {
    document.getElementById("form_edit_task").reset();
    $("#modal_edit_task").modal("hide");
}

function syncProjects() {

    ipcRenderer.send("PROJECTS", PROJECTS);

}
//https://discuss.atom.io/t/how-to-set-global-variable-of-main-process/24833/11

//=========================================================================================================
//Code
/*
var data = {}
data.okay = []
for (i = 0; i < 26; i++) {
  var obj = {
    id: i,
    square: i * i
  }
  data.okay.push(obj)
}


*/