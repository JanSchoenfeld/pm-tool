const fs = require('fs');
const path = require('path');
const {
    BrowserWindow,
    remote,
    ipcRenderer
} = require('electron');
const BacklogItem = require('../app/Models/backlog-item.js');
const EpicCapture = require('../app/Models/epic-capture');

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
    let epic;
    let backlogTable = document.getElementById("productbacklog_table");

    for (let i = 0; i < jsonFile.epicCaptures.length; i++) {
        epic = jsonFile.epicCaptures[i];
        //console.log("Epic "+ epic.epicId);
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

        let colId = document.createElement("td");
        let id = document.createTextNode(jsonFile.epicCaptures[i].epicId);
        colId.appendChild(id);
        epicRow.appendChild(colId);

        let colTitle = document.createElement("td");
        let title = document.createTextNode(jsonFile.epicCaptures[i].title);
        colTitle.appendChild(title);
        epicRow.appendChild(colTitle);

        let colEstimate = document.createElement("td");
        let estimate = document.createTextNode(jsonFile.epicCaptures[i].estimated);
        colEstimate.appendChild(estimate);
        epicRow.appendChild(colEstimate);

        let colStatus = document.createElement("td");
        let status;
        if (jsonFile.epicCaptures[i].epic_status.to_do === true) {
            status = document.createTextNode("To Do");
        } else if (jsonFile.epicCaptures[i].epic_status.in_progress === true) {
            status = document.createTextNode("In progress");
        } else if (jsonFile.epicCaptures[i].epic_status.done === true) {
            status = document.createTextNode("Done");
        } else {
            status = document.createTextNode("Missing");
        }
        colStatus.appendChild(status);
        epicRow.appendChild(colStatus);

        backlogTable.appendChild(epicRow);

        if (jsonFile.epicCaptures[i].backlogs.length > 0) {

            for (let j = 0; j < jsonFile.epicCaptures[i].backlogs.length; j++) {
                let backlogId = jsonFile.epicCaptures[i].backlogs[j];
                //console.log("Suche nach Backlog Eintrag mit ID " + backlogId);

                for (let k = 0; k < jsonFile.backlogs.length; k++) {
                    // console.log("Suche Backlog mit ID "+backlogId+" ...."+ " bei Backlog Position "+ k + " mit ID "+jsonFile.backlogs[k].backlogId);
                    if (backlogId == jsonFile.backlogs[k].backlogId) {
                        // console.log("Passender Backlog gefunden mit ID "+ jsonFile.backlogs[k].backlogId);

                        let backlogRow = document.createElement("tr");
                        backlogRow.onclick = function () {
                            displayEditBacklogItem(k);
                        };

                        backlogRow.style.backgroundColor = "Gainsboro";

                        let colIsEpic = document.createElement("td");
                        let isEpic = document.createTextNode("");
                        colIsEpic.appendChild(isEpic);
                        backlogRow.appendChild(colIsEpic);

                        let colId = document.createElement("td");
                        let id = document.createTextNode(jsonFile.backlogs[k].backlogId);
                        colId.appendChild(id);
                        backlogRow.appendChild(colId);

                        let colTitle = document.createElement("td");
                        let title = document.createTextNode(jsonFile.backlogs[k].title);
                        colTitle.appendChild(title);
                        backlogRow.appendChild(colTitle);

                        let colEstimate = document.createElement("td");
                        let estimate = document.createTextNode(jsonFile.backlogs[k].estimated);
                        colEstimate.appendChild(estimate);
                        backlogRow.appendChild(colEstimate);

                        let colStatus = document.createElement("td");
                        let status;
                        if (jsonFile.backlogs[k].backlog_status.to_do === true) {
                            status = document.createTextNode("To Do");
                        } else if (jsonFile.backlogs[k].backlog_status.in_progress === true) {
                            status = document.createTextNode("To Do");
                        } else if (jsonFile.backlogs[k].backlog_status.done === true) {
                            status = document.createTextNode("To Do");
                        } else {
                            status = document.createTextNode("Missing");
                        }
                        colStatus.appendChild(status);
                        backlogRow.appendChild(colStatus);

                        backlogTable.appendChild(backlogRow);

                        break;

                    }

                }
            }
            /*
            let br = document.createElement("br");
            epicRow.appendChild(br);
            epicRow.appendChild(tableBacklogsFromEpic);
            */
        }
    }

    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        if (jsonFile.backlogs[i].isInEpic === false) {
            let backlogRow = document.createElement("tr");
            backlogRow.onclick = function () {
                displayEditBacklogItem(i);
            };

            backlogRow.style.backgroundColor = "PowderBlue";

            let colIsEpic = document.createElement("td");
            let isEpic = document.createTextNode("BACKLOG");
            colIsEpic.appendChild(isEpic);
            backlogRow.appendChild(colIsEpic);

            let colId = document.createElement("td");
            let id = document.createTextNode(jsonFile.backlogs[i].backlogId);
            colId.appendChild(id);
            backlogRow.appendChild(colId);

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
            if (jsonFile.backlogs[i].backlog_status.to_do === true) {
                status = document.createTextNode("To Do");
            } else if (jsonFile.backlogs[i].backlog_status.in_progress === true) {
                status = document.createTextNode("In Progress");
            } else if (jsonFile.backlogs[i].backlog_status.done === true) {
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


function displayChooseItem() {
    $("#modal_chooseItem").modal("show");

}

function closeChooseItem() {
    $("#modal_chooseItem").modal("hide");
}

function displayAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    let selectSprint = document.getElementById("b_item_assign_to_sprint");
    //selectSprint.options[selectSprint.options.length] = new Option("" , "");
    for (let i = 0; i < jsonFile.sprints.length; i++) {
        let id = jsonFile.sprints[i].sprintId;
        selectSprint.options[selectSprint.options.length] = new Option("Sprint " + id, id);
    }
    let selectEpic = document.getElementById("b_item_assign_to_epic");
    //selectSprint.options[selectSprint.options.length] = new Option("" , "");
    for (let i = 0; i < jsonFile.epicCaptures.length; i++) {
        let id = jsonFile.epicCaptures[i].epicId;
        selectEpic.options[selectEpic.options.length] = new Option("Epic " + id, id);
    }
    closeChooseItem();
    $("#modal_add_backlogItem").modal("show");
}

function addBacklogItem() {
    let item_name = document.getElementById("b_item_name").value;
    let item_description = document.getElementById("b_item_description").value;
    let item_estimate_time = document.getElementById("b_item_estimate_time").value;
    //console.log("The backlog item was added! " + item_name + " " + item_description + " " + item_estimate_time);

    let tmpBLitem = new BacklogItem(item_name, item_description, "high", item_estimate_time);

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
    selectSprint.options[selectSprint.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.sprints.length; i++) {
        let id = jsonFile.sprints[i].sprintId;
        selectSprint.options[selectSprint.options.length] = new Option("Sprint " + id, id);
        if (selectedSprint == id) {
            //selectSprint.options[i].selectedIndex = true;
        }
    }
    let selectEpic = document.getElementById("edit_b_item_assign_to_epic");
    selectEpic.options[selectEpic.options.length] = new Option("", "");
    for (let i = 0; i < jsonFile.epicCaptures.length; i++) {
        let id = jsonFile.epicCaptures[i].epicId;

        if (selectedEpic == id) {
            selectEpic.options[selectEpic.options.length] = new Option("Epic " + id, id, false, true);
        } else {
            selectEpic.options[selectEpic.options.length] = new Option("Epic " + id, id);
        }
    }

    $("#modal_edit_backlogItem").modal("show");
}

function saveBacklogItem() {
    let item_name = document.getElementById("edit_b_item_name").value;
    let item_description = document.getElementById("edit_b_item_description").value;
    let item_estimate_time = document.getElementById("edit_b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("edit_b_item_assign_to_sprint").value;
    let item_assign_to_epic = document.getElementById("edit_b_item_assign_to_epic").value;
    let item_id = document.getElementById("edit_b_item_id").value;
    for (let i = 0; i < jsonFile.backlogs.length; i++) {

        if (jsonFile.backlogs[i].backlogId == item_id) {
            console.log("Item gefunden");
            jsonFile.backlogs[i].title = item_name;
            jsonFile.backlogs[i].description = item_description;
            jsonFile.backlogs[i].estimated = item_estimate_time;
            if (item_assign_to_sprint != "") {
                jsonFile.backlogs[i].isInSprint = true;
                for (let j = 0; j < jsonFile.sprints.length; j++) {
                    if (jsonFile.sprints[j].sprintId == item_assign_to_sprint) {
                        //TODO: SPEICHERN
                        jsonFile.sprints[j].backlogs.push(item_id);
                        //jsonFile.sprints[j].addBacklog(item_id);
                        alert("Added To Sprint " + item_assign_to_sprint);
                    }
                }
            } else {
                jsonFile.backlogs[i].isInSprint = false;
            }
            if (item_assign_to_epic != null) {
                jsonFile.backlogs[i].isInEpic = true;
                for (let j = 0; j < jsonFile.epicCaptures.length; j++) {
                    if (jsonFile.epicCaptures[j].epicId == item_assign_to_epic) {
                        //TODO: SPEICHERN
                        jsonFile.epicCaptures[j].backlogs.push(item_id);
                        //jsonFile.epicCaptures[j].addBacklog(item_id);
                        alert("Added To Epic " + item_assign_to_epic);
                    }
                }
            } else {
                jsonFile.backlogs[i].isInEpic = false;
                console.log("Deleted From Epic");
            }
            console.log("Item Edited" + jsonFile.backlogs[i]);

        }
    }
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

    console.log("The Epic Capture was added! " + item_name + " " + item_description + " " + item_estimate_time);
    let epicCapture = new EpicCapture(item_name, item_description, "high", "high", item_estimate_time);

    jsonFile.epicCaptures.push(epicCapture);
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
    document.getElementById("edit_e_item_name").value = jsonFile.epicCaptures[i].title;
    document.getElementById("edit_e_item_description").value = jsonFile.epicCaptures[i].description;
    document.getElementById("edit_e_item_estimate_time").value = jsonFile.epicCaptures[i].estimated;
    document.getElementById("edit_e_item_id").value = jsonFile.epicCaptures[i].epicId;
    $("#modal_edit_epicCapture").modal("show");
}

function saveEpicCapture() {
    let item_name = document.getElementById("edit_e_item_name").value;
    let item_description = document.getElementById("edit_e_item_description").value;
    let item_estimate_time = document.getElementById("edit_e_item_estimate_time").value;
    let item_id = document.getElementById("edit_e_item_id").value;

    for (let i = 0; i < jsonFile.epicCaptures.length; i++) {
        if (jsonFile.epicCaptures[i].epicId == item_id) {
            console.log("Item gefunden");
            jsonFile.epicCaptures[i].title = item_name;
            jsonFile.epicCaptures[i].description = item_description;
            //TODO: Backend funktion: Alle Zeiten der backlogs im Epic zusammenzählen --> Alle Zeiten der Tasks ins Backlog
            jsonFile.epicCaptures[i].estimated = item_estimate_time;
            console.log("Item Edited" + jsonFile.epicCaptures[i]);
            reload();
        }
    }
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
    let sprint1 = new Sprint(sprint_name, sprint_startdate, sprint_enddate, sprint_capacity);

    jsonFile.sprints.push(sprint1);
    PROJECTS[POSITION] = jsonFile;
    syncProjects();
    reload();
    closeAddSprint();
}

function displayEditSprint(s) {
    document.getElementById("form_editSprint").reset();
    document.getElementById("edit_s_name").value = jsonFile.sprints[s].title;
    document.getElementById("edit_s_startdate").value = jsonFile.epicCaptures[s].startdate;
    document.getElementById("edit_s_enddate").value = jsonFile.epicCaptures[s].enddate;
    document.getElementById("edit_s_capacity").value = jsonFile.epicCaptures[s].capacity;

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
            jsonFile.sprints[i].title = sprint_name;
            jsonFile.sprints[i].startdate = sprint_startdate;
            jsonFile.sprints[i].enddate = sprint_enddate;
            //TODO: Backend funktion: Alle Zeiten der backlogs im Epic zusammenzählen --> Alle Zeiten der Tasks ins Backlog
            jsonFile.sprints[i].capacity = sprint_capacity;
            console.log("Item Edited" + jsonFile.sprints[i]);
            reload();
        }
    }
    closeEditEpicCapture();

}

function closeEditSprint() {
    document.getElementById("form_editSprint").reset();
    $("#modal_edit_sprint").modal("hide");
}


function deleteBacklog() {
    let id = document.getElementById("edit_b_item_id");
    console.log(id);

    reload();
    //TODO: LÖSCHEN
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

function deleteEpicCapture() {
    let id = document.getElementById("edit_e_item_id");
    console.log(id);
    reload();
    //TODO: LÖSCHEN
}
function deleteSprint() {
    let id = document.getElementById("edit_s_item_id");
    console.log(id);
    reload();
    //TODO: LÖSCHEN
}
*/