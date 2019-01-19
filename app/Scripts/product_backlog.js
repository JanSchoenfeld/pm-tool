const fs = require('fs');
const path = require('path');
const {
    BrowserWindow
} = require('electron')
const {
    remote
} = require('electron');
//const projectData = require('../logic');

//const Task = require('./app/Models/task');
const Project = require('../app/Models/project');
//const Roles = require('./app/Models/roles');
//const User = require('./app/Models/user');
//const Status = require('./app/Models/status');
const BacklogItem = require('../app/Models/backlog-item');
const EpicCapture = require('../app/Models/epic-capture');
//const Sprint = require('../app/Models/sprint');


let PROJECTS = remote.getGlobal('PROJECTS');
let POSITION = fs.readFileSync('data/global/POSITION.json');
//let project = loadProject();

function loadProject() {

    let project = PROJECTS[POSITION];

    return project;
}


let jsonFile = loadProject();


//HTML parent <table> ID
var table = document.getElementById("productbacklog_table");


//siteContent();
listEpicCapturesWithBacklogs();

function listEpicCapturesWithBacklogs() {
    let epic;
    let backlogTable = document.getElementById("productbacklog_table");

    for (let i= 0; i < jsonFile.epicCaptures.length; i++) {
        epic = jsonFile.epicCaptures[i];
        console.log("Epic "+ epic.epicId);
        let backlog;

        let epicRow = document.createElement("tr");
        epicRow.onclick =function () {
            displayEditEpicCapture(i);
        };
        epicRow.style.backgroundColor ="DarkGray";

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
        }
        else if (jsonFile.epicCaptures[i].epic_status.in_progress === true) {
            status = document.createTextNode("To Do");
        }
        else if (jsonFile.epicCaptures[i].epic_status.done === true) {
            status = document.createTextNode("To Do");
        }
        else {
            status = document.createTextNode("Missing");
        }
        colStatus.appendChild(status);
        epicRow.appendChild(colStatus);

        backlogTable.appendChild(epicRow);

        if (jsonFile.epicCaptures[i].backlogs.length > 0) {
            let tableBacklogsFromEpic = document.createElement("table");


            for (let j=0; j < jsonFile.epicCaptures[i].backlogs.length; j++) {
                let backlogId = jsonFile.epicCaptures[i].backlogs[j];
                console.log("Backlog " + backlogId);

                for (let k=0; k <  jsonFile.backlogs.length; k++) {
                    console.log("Suche Backlog "+ jsonFile.backlogs[k].backlogId+" ....");
                    if (jsonFile.epicCaptures[i].backlogs[j] ==  jsonFile.backlogs[k].backlogId) {
                        console.log("Passender Backlog gefunden "+ jsonFile.backlogs[k].backlogId);

                        let backlogRow = document.createElement("tr");
                        backlogRow.onclick =function () {
                            displayEditBacklogItem(i);
                        };

                        backlogRow.style.backgroundColor = "Gainsboro";

                        let colIsEpic = document.createElement("td");
                        let isEpic = document.createTextNode("");
                        colIsEpic.appendChild(isEpic);
                        backlogRow.appendChild(colIsEpic);

                        let colId = document.createElement("td");
                        let id = document.createTextNode(jsonFile.epicCaptures[i].epicId);
                        colId.appendChild(id);
                        backlogRow.appendChild(colId);

                        let colTitle = document.createElement("td");
                        let title = document.createTextNode(jsonFile.epicCaptures[i].title);
                        colTitle.appendChild(title);
                        backlogRow.appendChild(colTitle);

                        let colEstimate = document.createElement("td");
                        let estimate = document.createTextNode(jsonFile.epicCaptures[i].estimated);
                        colEstimate.appendChild(estimate);
                        backlogRow.appendChild(colEstimate);

                        let colStatus = document.createElement("td");
                        let status;
                        if (jsonFile.epicCaptures[i].epic_status.to_do === true) {
                            status = document.createTextNode("To Do");
                        }
                        else if (jsonFile.epicCaptures[i].epic_status.in_progress === true) {
                            status = document.createTextNode("To Do");
                        }
                        else if (jsonFile.epicCaptures[i].epic_status.done === true) {
                            status = document.createTextNode("To Do");
                        }
                        else {
                            status = document.createTextNode("Missing");
                        }
                        colStatus.appendChild(status);
                        backlogRow.appendChild(colStatus);

                        backlogTable.appendChild(backlogRow);

                        listBacklogItem(k);

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

    for (let i=0; i < jsonFile.backlogs.length; i++) {
        if (jsonFile.backlogs[i].isInEpic === false) {
            let backlogRow = document.createElement("tr");
            backlogRow.onclick =function () {
                displayEditBacklogItem(i);
            };

            backlogRow.style.backgroundColor = "PowderBlue";

            let colIsEpic = document.createElement("td");
            let isEpic = document.createTextNode("BACKLOG");
            colIsEpic.appendChild(isEpic);
            backlogRow.appendChild(colIsEpic);

            let colId = document.createElement("td");
            let id = document.createTextNode(jsonFile.epicCaptures[i].epicId);
            colId.appendChild(id);
            backlogRow.appendChild(colId);

            let colTitle = document.createElement("td");
            let title = document.createTextNode(jsonFile.epicCaptures[i].title);
            colTitle.appendChild(title);
            backlogRow.appendChild(colTitle);

            let colEstimate = document.createElement("td");
            let estimate = document.createTextNode(jsonFile.epicCaptures[i].estimated);
            colEstimate.appendChild(estimate);
            backlogRow.appendChild(colEstimate);

            let colStatus = document.createElement("td");
            let status;
            if (jsonFile.epicCaptures[i].epic_status.to_do === true) {
                status = document.createTextNode("To Do");
            }
            else if (jsonFile.epicCaptures[i].epic_status.in_progress === true) {
                status = document.createTextNode("To Do");
            }
            else if (jsonFile.epicCaptures[i].epic_status.done === true) {
                status = document.createTextNode("To Do");
            }
            else {
                status = document.createTextNode("Missing");
            }
            colStatus.appendChild(status);
            backlogRow.appendChild(colStatus);

            backlogTable.appendChild(backlogRow);
        }
    }
}

function listBacklogItem(id) {
    for (let i= 0; i < jsonFile.backlogs.length; i++) {
        if (jsonFile.backlogs[i].backlogId == id) {
            console.log("backlog item an position " +i+" mit ID "+jsonFile.backlogs[i].backlogId);
        }
    }
}

function listBacklogItemWithoutEpic() {
    for (let p = 0; p < jsonFile.backlogs.length;p++) {
        if (jsonFile.backlogs[p].isInEpic === false) {
            //List Backlogs without Epics HTML...
        }
    }
}


function siteContent() {


    //Loop for the backlog array
    for (let i = 0; i < jsonFile.backlogs.length; i++) {
        //decision tree
        var newStatus;
        if (jsonFile.backlogs[i].backlog_status.to_do) {
            newStatus = "To do";
        }
        if (jsonFile.backlogs[i].backlog_status.in_progress) {
            newStatus = "In progress";
        }
        if (jsonFile.backlogs[i].backlog_status.done) {
            newStatus = "Done";
        }

        //New Row
        var newTR = document.createElement("tr");

        //1. Column ID
        var newTD1 = document.createElement("td");
        var newContent1 = document.createTextNode(jsonFile.backlogs[i].backlogId);
        newTD1.appendChild(newContent1);
        newTR.appendChild(newTD1);

        //2. Column item_description
        var newContent2 = document.createTextNode(jsonFile.backlogs[i].description);
        var a = document.createElement('a');
        a.appendChild(newContent2);
        a.title = jsonFile.backlogs[i].description;
        a.href = "javascript:displayEditBacklogItem(" + i + ")";

        var newTD2 = document.createElement("td");
        newTD2.appendChild(a);
        newTR.appendChild(newTD2);

        //3. Column priority
        var newContent3 = document.createTextNode(jsonFile.backlogs[i].priority.priority);
        var newTD3 = document.createElement("td");
        newTD3.appendChild(newContent3);
        newTR.appendChild(newTD3);

        //4. Column estimate
        var newContent4 = document.createTextNode(jsonFile.backlogs[i].estimated);
        var newTD4 = document.createElement("td");
        newTD4.appendChild(newContent4);
        newTR.appendChild(newTD4);

        //5. Column status
        var newContent5 = document.createTextNode(newStatus);
        var newTD5 = document.createElement("td");
        newTD5.appendChild(newContent5);
        newTR.appendChild(newTD5);

        //Add row
        table.appendChild(newTR);
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
    closeChooseItem();
    $("#modal_add_backlogItem").modal("show");
}

function addBacklogItem() {
    let item_name = document.getElementById("b_item_name").value;
    let item_description = document.getElementById("b_item_description").value;
    let item_estimate_time = document.getElementById("b_item_estimate_time").value;
    console.log("The backlog item was added! " + item_name + " " + item_description + " " + item_estimate_time);

    let backlogItem = new BacklogItem(item_name,item_description,"high" ,item_estimate_time);
    console.log(backlogItem);
    let file = jsonFile;




    console.log(file.backlogs.length);
    file.addBacklog(backlogItem);
    console.log(file.backlogs.length);
    jsonFile = file;

    closeAddBacklogItem();

    //TODO: Backlog Speichern

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
    $("#modal_edit_backlogItem").modal("show");
}

function saveBacklogItem() {
    let item_name = document.getElementById("edit_b_item_name").value;
    let item_description = document.getElementById("edit_b_item_description").value;
    let item_estimate_time = document.getElementById("edit_b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("edit_b_item_assign_to_sprint").value;
    let item_id = document.getElementById("edit_b_item_id").value;
    for(let i=0; i<jsonFile.backlogs.length; i++) {

        //Ändern? Keine Typensicherheit
        if (jsonFile.backlogs[i].backlogId == item_id) {
            console.log("Item gefunden");
            jsonFile.backlogs[i].title = item_name;
            jsonFile.backlogs[i].description = item_description;
            jsonFile.backlogs[i].estimated = item_estimate_time;
            //TODO: LUC: Sprint variable in Backlogitem
            //jsonFile.backlogs[i].sprint = item_assign_to_sprint;
            console.log("Item Edited" + jsonFile.backlogs[i]);
        }
    }
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
    let epicCapture = new EpicCapture(item_name,item_description, "high", "high", item_estimate_time);
    console.log(epicCapture);
    //TODO: Speichern
    closeAddEpicCapture()
}

function closeAddEpicCapture() {
    $("#modal_add_epicCapture").modal('hide');
}

function displayEditEpicCapture(i) {
     document.getElementById("form_edit_epicCapture").reset();
     document.getElementById("edit_e_item_name").value = jsonFile.epicCaptures[i].title;
     document.getElementById("edit_e_item_description").value = jsonFile.epicCaptures[i].description;
     document.getElementById("edit_e_item_estimate_time").value = jsonFile.epicCaptures[i].estimated;
     document.getElementById("edit_b_item_id").value = jsonFile.epicCaptures[i].epicId;
     $("#modal_edit_epicCapture").modal("show");
}

function saveEpicCapture() {
    let item_name = document.getElementById("edit_e_item_name").value;
    let item_description = document.getElementById("edit_e_item_description").value;
    let item_estimate_time = document.getElementById("edit_e_item_estimate_time").value;
    let item_id = document.getElementById("edit_e_item_id").value;

    for(let i=0; i<jsonFile.epicCaptures.length; i++) {
        if (jsonFile.epicCaptures[i].epicId == item_id) {
            jsonFile.epicCaptures[i].title = item_name;
            jsonFile.epicCaptures[i].description = item_description;
            //TODO: Backend funktion: Alle Zeiten der backlogs im Epic zusammenzählen --> Alle Zeiten der Tasks ins Backlog
            jsonFile.epicCaptures[i].estimated = item_estimate_time;
            console.log("Item Edited" + jsonFile.epicCaptures[i]);
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

    console.log("The Sprint was added! " + sprint_name + " " + sprint_startdate + " " + sprint_enddate+" "+sprint_capacity);
    let sprint1;
    sprint1 = new Sprint(sprint_name,sprint_startdate, sprint_enddate,sprint_capacity);

    //TODO: Sprint Speichern
    console.log(sprint1);
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

    for(let i=0; i<jsonFile.sprints.length; i++) {
        if (jsonFile.sprints[i].sprintId == sprint_id) {
            jsonFile.sprints[i].title = sprint_name;
            jsonFile.sprints[i].startdate = sprint_startdate;
            jsonFile.sprints[i].enddate = sprint_enddate;
            //TODO: Backend funktion: Alle Zeiten der backlogs im Epic zusammenzählen --> Alle Zeiten der Tasks ins Backlog
            jsonFile.sprints[i].capacity = sprint_capacity;
            console.log("Item Edited" + jsonFile.sprints[i]);
        }
    }
   closeEditEpicCapture();

}

function closeEditSprint() {
    document.getElementById("form_editSprint").reset();
    $("#modal_edit_sprint").modal("hide");
}


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


fs.writeFile('myjsonfile.json', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
*/