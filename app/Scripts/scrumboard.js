const fs = require('fs');
const path = require('path')

//Load JSON-File
var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, '/../data/pmtool.json')));
//HTML parent <DIV> ID
var strory = document.getElementById('story_col');
var notStart = document.getElementById('notStart_col');
var doing = document.getElementById('doing_col');
var done = document.getElementById('done_col');

//Loop for backlog array
for (let i = 0; i < jsonFile.backlogs.length; i++) {
  //Create new div
  var newDiv = document.createElement("div");
  //Set Class
  newDiv.className = 'content';
  //Create new Content
  var newContent = document.createTextNode(jsonFile.backlogs[i].title)
  //Add content to the div
  newDiv.appendChild(newContent);
  //decision tree
  if (jsonFile.backlogs[i].backlog_status.to_do) {
    notStart.appendChild(newDiv);
  }
  if (jsonFile.backlogs[i].backlog_status.in_progress) {
    doing.appendChild(newDiv);
  }
  if (jsonFile.backlogs[i].backlog_status.done) {
    done.appendChild(newDiv);
  }

}
