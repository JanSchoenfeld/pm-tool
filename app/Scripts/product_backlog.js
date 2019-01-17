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
//const Project = require('./app/Models/project');
//const Roles = require('./app/Models/roles');
//const User = require('./app/Models/user');
//const Sprint = require('./app/Models/sprint');
//const Status = require('./app/Models/status');
const BacklogItem = require('../app/Models/backlog-item');
const EpicCapture = require('../app/Models/epic-capture');


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

//listEpicCapture();
siteContent();


function listEpicCapture() {
    for (let i= 0; i < jsonFile.epicCaptures.length; i++) {
        //console.log("epic Capture "+i+" "+jsonFile.epicCaptures.length);
        for (let j=0; j < jsonFile.epicCaptures[i].backlogs.length; i++) {
            console.log("Epic Capture " + i +" und Backlog Item " + j);
        }
    }
}

function listBacklogItem() {
    for (let i= 0; i < jsonFile.backlogs.length; i++) {
        console.log("backlog item " +i+" "+jsonFile.backlogs.length);
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
    closeAddBacklogItem();
    return backlogItem;

    //TODO: Backend Funktion (Speichern)

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
    document.getElementById("edit_b_item_assign_to_sprint").value = jsonFile.backlogs[i].sprintId;
    $("#modal_edit_backlogItem").modal("show");
}

function saveBacklogItem() {
    let item_name = document.getElementById("edit_b_item_name").value;
    let item_description = document.getElementById("edit_b_item_description").value;
    let item_estimate_time = document.getElementById("edit_b_item_estimate_time").value;
    let item_assign_to_sprint = document.getElementById("edit_b_item_assign_to_sprint").value;

    console.log("The backlog Item was added! " + item_name + " " + item_description + " " + " " + item_estimate_time + " " + item_assign_to_sprint);
    let backlogItem = new BacklogItem(item_name,item_description,"high" ,item_estimate_time);
    backlogItem.sprintId = item_assign_to_sprint;
    console.log(backlogItem);
    //TODO: Backend Funktion

    closeEditBacklogItem();
    return backlogItem;

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
    closeAddEpicCapture()
    return epicCapture;
}

function closeAddEpicCapture() {
    $("#modal_add_epicCapture").modal('hide');
}

function displayEditEpicCapture() {
     document.getElementById("form_edit_epicCapture").reset();
     document.getElementById("edit_e_item_name").value = jsonFile.epicCaptures[i].title;
     document.getElementById("edit_e_item_description").value = jsonFile.epicCaptures[i].description;
     document.getElementById("edit_e_item_estimate_time").value = jsonFile.epicCaptures[i].estimated;
    $("#modal_edit_epicCapture").modal("show");
}

function saveEpicCapture() {
    let item_name = document.getElementById("edit_e_item_name").value;
    let item_description = document.getElementById("edit_e_item_description").value;
    let item_estimate_time = document.getElementById("edit_e_item_estimate_time").value;

    console.log("The Epic Capture was edited! " + item_name + " " + item_description + " " + item_estimate_time);
    let epicCapture = new EpicCapture(item_name,item_description, "high", "high", item_estimate_time);
    console.log(epicCapture);
    //TODO: Backend Funktion

    closeEditEpicCapture();
    return epicCapture;
}

function closeEditEpicCapture() {
    document.getElementById("form_edit_epicCapture").reset();
    $("#modal_edit_epicCapture").modal("hide");
}

function openModal() {

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