const fs = require('fs');
const path = require('path');
const {remote} = require('electron');

document.getElementById('button1');
document.addEventListener('click',openModal);
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