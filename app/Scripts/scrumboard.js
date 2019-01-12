const fs = require('fs');
const path = require('path')

//Load JSON-File
var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, '/../data/pmtool.json')));
var sprintNumber = 0;
//HTML ID finding
var scrumDiv = document.getElementById('scrumboard');
var contentWasWriten = false;

//Sprint switch buttons
if (jsonFile.sprints.length > 0) {
  //Create Actionrow
  var actionrow = document.createElement('div');
  actionrow.className='row';
  //Create 4 Columns for the Actionrow
  var fillercol1 = document.createElement('div');
  fillercol1.className = 'col-md-3 container-headline';
  var fillercol2 = document.createElement('div');
  fillercol2.className = 'col-md-3 container-headline';
  var fillercol3 = document.createElement('div');
  fillercol3.className = 'col-md-3 container-headline';
  //Column for the Buttonaction
  var buttoncol = document.createElement('div');
  buttoncol.className='col-md-3 container-headline';
  //back Button
  var backButton = document.createElement('button');
  backButton.className = 'btn btn-success'
  var backIcon =  document.createElement('i');
  backIcon.className = 'fas fa-chevron-circle-left'
  //forward Button
  var forwardButton = document.createElement('button');
  forwardButton.className = 'btn btn-success'
  var forwardIcon =  document.createElement('i');
  forwardIcon.className = 'fas fa-chevron-circle-right'

  //Add alle Items
  forwardButton.appendChild(forwardIcon);
  backButton.appendChild(backIcon);
  buttoncol.appendChild(backButton);
  buttoncol.appendChild(forwardButton);
  actionrow.appendChild(fillercol1);
  actionrow.appendChild(fillercol2);
  actionrow.appendChild(fillercol3);
  actionrow.appendChild(buttoncol);
  var headDiv = document.getElementById('head');
  scrumDiv.insertBefore(actionrow,headDiv);
}


//Loop for backlog array
for (let i = 0; i < jsonFile.backlogs.length; i++) {
  //Get Array with alle Backlogs in Sprint
  sprintBacklogItemIds = jsonFile.sprints[sprintNumber].backlogItemIds

  var useBacklogItem = false;
  var sprintArrayID;

  for (let j = 0; j < sprintBacklogItemIds.length; j++) {
    if (jsonFile.backlogs[i].backlogId == sprintBacklogItemIds[j].backlogID) {
      useBacklogItem = true;
      sprintArrayID = j;
    }
  }
  //Is the current BacklogItem in the chosen sprint?
  if (useBacklogItem) {
    //Create new Row
    var newRowDiv = document.createElement("div");
    newRowDiv.className = 'row';
    //Create new Columns
    //Story Div
    var newStoryDiv = document.createElement('div');
    newStoryDiv.className = 'column col-md-3';
    //Backlog Div
    var newBacklogDiv = document.createElement('div');
    newBacklogDiv.className = 'column col-md-3';
    //Doing Div
    var newDoingDiv = document.createElement('div');
    newDoingDiv.className = 'column col-md-3';
    //Done Div
    var newDoneDiv = document.createElement('div');
    newDoneDiv.className = 'column col-md-3';

    //Create new ContentDiv
    var newStoryContentDiv = document.createElement('div');
    newStoryContentDiv.className = 'content';
    //Set Content
    var newStoryContent = document.createTextNode(jsonFile.backlogs[i].title);

    //Add content to the div
    newStoryContentDiv.appendChild(newStoryContent);
    newStoryDiv.appendChild(newStoryContentDiv);
    newRowDiv.appendChild(newStoryDiv);

    var tasks = jsonFile.backlogs[i].tasks;
    var sprintTasks = sprintBacklogItemIds[sprintArrayID].taskIds;

    for (let j = 0; j < tasks.length; j++) {
      if (sprintTasks.includes(tasks[j].taskId)) {
        
      var newTaskContent = document.createTextNode(tasks[j].title)
      var newContentDiv = document.createElement('div');
      newContentDiv.className = 'content';
      var status = tasks[j].task_status;
      if (tasks[j].task_status == 0) {
        newContentDiv.appendChild(newTaskContent);
        newBacklogDiv.appendChild(newContentDiv);
        newRowDiv.appendChild(newBacklogDiv);
      }
      else if (tasks[j].task_status == 1) {
        newContentDiv.appendChild(newTaskContent);
        newDoingDiv.appendChild(newContentDiv);
        newRowDiv.appendChild(newDoingDiv);
      }
      else if (tasks[j].task_status == 2) {
        newContentDiv.appendChild(newTaskContent);
        newDoneDiv.appendChild(newContentDiv);
        newRowDiv.appendChild(newDoneDiv);
      }

    }
    }

    scrumDiv.appendChild(newRowDiv);
    contentWasWriten = true;
  }
}
if (contentWasWriten == false) {
  var newErrorRowDiv = document.createElement('div');
    newErrorRowDiv.className='row';
    var newErrorDiv = document.createElement('div');
    newErrorDiv.className = 'column col-md-3';
    var errorMessage = document.createTextNode('This is an Empty Sprint')


    newErrorDiv.appendChild(errorMessage);
    newErrorRowDiv.appendChild(newErrorDiv);
    scrumDiv.appendChild(newErrorRowDiv);
}
