const fs = require('fs');
const path = require('path');
const projectData = require('../logic');
const backlogItem = require("../app/Models/backlog-item.js");
const epicCapture = require("../app/Models/epic-capture.js");


//Load JSON-File
var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, '/../data/pmtool.json')));
//HTML parent <table> ID
var table = document.getElementById('productbacklog_table');
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
  var newContent1 = document.createTextNode(jsonFile.backlogs[i].backlogId)
  newTD1.appendChild(newContent1);
  newTR.appendChild(newTD1);

  //2. Column item_description
  var newContent2 = document.createTextNode(jsonFile.backlogs[i].description)
  var newTD2 = document.createElement("td");
  newTD2.appendChild(newContent2);
  newTR.appendChild(newTD2);

  //3. Column priority
  var newContent3 = document.createTextNode(jsonFile.backlogs[i].priority.priority)
  var newTD3 = document.createElement("td");
  newTD3.appendChild(newContent3);
  newTR.appendChild(newTD3);

  //4. Column estimate
  var newContent4 = document.createTextNode(jsonFile.backlogs[i].estimated)
  var newTD4 = document.createElement("td");
  newTD4.appendChild(newContent4);
  newTR.appendChild(newTD4);

  //5. Column status
  var newContent5 = document.createTextNode(newStatus)
  var newTD5 = document.createElement("td");
  newTD5.appendChild(newContent5);
  newTR.appendChild(newTD5);

  //Add row
  table.appendChild(newTR);
}

function displayChooseItem() {
    $("#modal_chooseItem").modal("show");
}
function close_chooseItem() {
    $("#modal_chooseItem").modal("hide");
}


function displayAddBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    $("#modal_chooseItem").modal("hide");
    $("#modal_add_backlogItem").modal("show");
    //document.getElementById("modal_add_backlogItem").modal("show");
}
function saveBacklogItem() {
    var item_name = document.getElementById("item_name").value;
    var item_description = document.getElementById("item_description").value;
    var item_estimate_time = document.getElementById("item_estimate_time").value;
    var item_assign_to_sprint = document.getElementById("item_assign_to_sprint").value;

    alert("The Item was added! "+item_name+" "+item_description+" "+" "+item_estimate_time+" "+item_assign_to_sprint);

    //TODO: Luc: Backend Funktion

    close_addBacklogItem();
}
function close_addBacklogItem() {
    document.getElementById("form_addBacklogItem").reset();
    $("#modal_add_backlogItem").modal('hide');
}
function displayEditBacklogItem () {
    /**
    document.getElementById("form_edit_backlog").reset();
    document.getElementById("edit_b_item_name").value = backlogItem.name;
    document.getElementById("edit_b_item_description").value = backlogItem.description;
    document.getElementById("edit_b_item_estimate_time").value = backlogItem.estimated;
    document.getElementById("edit_b_item_assign_to_sprint").value = backlogItem.sprintId;
*/
    $("#modal_edit_backlogItem").modal("show");
}
function saveEditBacklogItem() {
    var item_name = document.getElementById("eb_item_name").value;
    var item_description = document.getElementById("eb_item_description").value;
    var item_estimate_time = document.getElementById("eb_item_estimate_time").value;

    alert("The Item was added! "+item_name+" "+item_description+" "+item_estimate_time);

    //TODO: Luc: Backend Funktion

    closeEditBacklogItem();
}
function closeEditBacklogItem() {
    //document.getElementById("form_edit_backlog").reset();
    $("#modal_edit_backlogItem").modal("hide");
}



function displayAddEpicCapture() {
    document.getElementById("form_addEpicCapture").reset();
    //$("#modal_chooseItem").modal("hide");
    close_chooseItem();
    $("#modal_add_epicCapture").modal("show");
}
function saveEpicCapture() {
    var item_name = document.getElementById("ee_item_name").value;
    var item_description = document.getElementById("ee_item_description").value;
    var item_estimate_time = document.getElementById("ee_item_estimate_time").value;

    alert("The Item was added! "+item_name+" "+item_description+" "+item_estimate_time);

    //TODO: Luc: Backend Funktion

    close_addEpicCapture();
}
function close_addEpicCapture() {
    //document.getElementById("form_edit_BacklogItem").reset();
    $("#modal_add_epicCapture").modal('hide');
}
function displayEditEpicCapture () {
    /**
    document.getElementById("form_edit_epicCapture").reset();
    document.getElementById("edit_b_item_name").value = epicCapture.name;
    document.getElementById("edit_b_item_description").value = epicCapture.description;
    document.getElementById("edit_b_item_estimate_time").value = epicCapture.estimated;
    document.getElementById("edit_b_item_assign_to_sprint").value = epicCapture.sprintId;
    */
    $("#modal_edit_epicCapture").modal("show");

}
function saveEditEpicCapture() {
    var item_name = document.getElementById("ee_item_name").value;
    var item_description = document.getElementById("ee_item_description").value;
    var item_estimate_time = document.getElementById("ee_item_estimate_time").value;

    alert("The Item was added! "+item_name+" "+item_description+" "+item_estimate_time);

    //TODO: Luc: Backend Funktion

    closeEditEpicCapture();
}
function closeEditEpicCapture() {
    document.getElementById("form_edit_epicCapture").reset();
    $("#modal_edit_epicCapture").modal("hide");
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