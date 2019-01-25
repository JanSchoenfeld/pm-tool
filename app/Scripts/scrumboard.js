const fs = require('fs');
const path = require('path');
const {
  remote,
  ipcRenderer
} = require('electron');

//currentWindow.loadURL(`file://${__dirname}/app/intro.html`)
//console.log(require('electron').remote.getGlobal('PROJECTS')[0].title)

let PROJECTS;
let project;
let POSITION = JSON.parse(fs.readFileSync('data/global/POSITION.json'));


var sprintNumber = 0;
//HTML ID finding
var scrumDiv = document.getElementById('scrumboard');


ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

  PROJECTS = projects;
  project = PROJECTS[POSITION]
  calculateBacklogEffort(project);
  syncProjects();
  calculateEpicEffort(project);
  syncProjects();
  //console.log((JSON.stringify(project, null, 2)));
  siteContent();
})

ipcRenderer.send("reqPROJECTS");



function siteContent() {
  //Sprint switch buttons
  if (project.sprints.length > 1 && project.sprints.length != 0) {
    //Create Actionrow
    var actionrow = document.createElement('div');
    actionrow.className = 'row';
    actionrow.id = 'action_Row'
    //Create 4 Columns for the Actionrow
    var fillercol1 = document.createElement('div');
    fillercol1.className = 'col-md-3 container-headline';
    var fillercol2 = document.createElement('div');
    fillercol2.className = 'col-md-3 container-headline';
    var fillercol3 = document.createElement('div');
    fillercol3.className = 'col-md-3 container-headline';

    //Column for the Buttonaction
    var buttoncol = document.createElement('div');
    buttoncol.className = 'col-md-3 container-headline';

    //back Button
    var backIcon = document.createElement('i');
    backIcon.addEventListener("click", sprintBack);
    backIcon.className = 'fas fa-chevron-circle-left'

    //forward Button
    var forwardIcon = document.createElement('i');
    forwardIcon.addEventListener("click", sprintForward);
    forwardIcon.className = 'fas fa-chevron-circle-right'

    //Text for Sprint-Navigation
    var sprintContent = document.createTextNode(' Sprint: ' + project.sprints[sprintNumber].name + " ");
    var currentSprint = document.createElement('i');
    currentSprint.style.userSelect = "none";

    //Add alle Items
    //forwardButton.appendChild(forwardIcon);
    currentSprint.appendChild(sprintContent);
    buttoncol.appendChild(backIcon);
    buttoncol.appendChild(currentSprint);
    buttoncol.appendChild(forwardIcon);
    actionrow.appendChild(fillercol1);
    actionrow.appendChild(fillercol2);
    actionrow.appendChild(fillercol3);
    actionrow.appendChild(buttoncol);
    var headDiv = document.getElementById('head');
    scrumDiv.insertBefore(actionrow, headDiv);
  }


  //Loop for backlog array
  if (project.sprints.length > 0) {
    var contentWasWriten = false;
    var pageContentDiv = document.createElement('div');
    pageContentDiv.id = 'pageContentDiv';
    if (project.sprints[sprintNumber].backlogs != null && project.sprints[sprintNumber].backlogs != 0) {

      for (let i = 0; i < project.backlogs.length; i++) {
        //Is the current BacklogItem in the chosen sprint?
        if (project.sprints[sprintNumber].backlogs.includes(project.backlogs[i].backlogId)) {
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
          newBacklogDiv.id = 'backlog' + i;
          newBacklogDiv.addEventListener('drop', drop);
          newBacklogDiv.addEventListener('dragover', allowDrop);
          //Doing Div
          var newDoingDiv = document.createElement('div');
          newDoingDiv.className = 'column col-md-3';
          newDoingDiv.id = 'doing' + i;
          newDoingDiv.addEventListener('drop', drop);
          newDoingDiv.addEventListener('dragover', allowDrop);
          //Done Div
          var newDoneDiv = document.createElement('div');
          newDoneDiv.className = 'column col-md-3';
          newDoneDiv.id = 'done' + i;
          newDoneDiv.addEventListener('drop', drop);
          newDoneDiv.addEventListener('dragover', allowDrop);

          //Create new ContentDiv
          var newStoryContentDiv = document.createElement('div');
          newStoryContentDiv.className = 'content';
          //Create textdiv and actionDiv
          var newTextDiv = document.createElement('div');
          var newActionDiv = document.createElement('div');
          //create action icons

          var editIcon = document.createElement('i');
          editIcon.className = "far fa-edit";
          //editIcon.addEventListener(function_here);
          var deleteIcon = document.createElement('i');
          deleteIcon.className = "far fa-trash-alt";
          //deleteIcon.addEventListener(function_here);

          //Set Content
          var newStoryContent = document.createTextNode(project.backlogs[i].title);

          //Add content to the div
          newTextDiv.appendChild(newStoryContent);
          newActionDiv.appendChild(editIcon);
          newActionDiv.appendChild(deleteIcon);
          newStoryContentDiv.appendChild(newTextDiv);
          newStoryContentDiv.appendChild(newActionDiv);
          newStoryDiv.appendChild(newStoryContentDiv);
          newRowDiv.appendChild(newStoryDiv);
          newRowDiv.appendChild(newBacklogDiv);
          newRowDiv.appendChild(newDoingDiv);
          newRowDiv.appendChild(newDoneDiv);

          //var tasks = project.backlogs[i].tasks;
          //var sprintTasks = sprintBacklogItemIds[sprintArrayID].taskIds;

          for (let j = 0; j < project.tasks.length; j++) {
            if (project.tasks[j].inBacklog == project.backlogs[i].backlogId) {
              //Task Content-Text
              var newTaskContent = document.createTextNode(project.tasks[j].title)
              //Content div
              var newContentDiv = document.createElement('div');
              newContentDiv.className = 'content';
              newContentDiv.id = i.toString() + j.toString()
              newContentDiv.draggable = true;
              newContentDiv.addEventListener('dragstart', drag);
              newContentDiv.addEventListener('dragover', function () {
                return false;
              })
              //Create textdiv and actionDiv
              var newTextDiv = document.createElement('div');
              var newActionDiv = document.createElement('div');
              //create action icons
              var editIcon = document.createElement('i');
              editIcon.className = "far fa-edit";
              //editIcon.addEventListener(function_here);
              var deleteIcon = document.createElement('i');
              deleteIcon.className = "far fa-trash-alt";
              //deleteIcon.addEventListener(function_here);

              if (project.tasks[j].status == "to do") {
                newTextDiv.appendChild(newTaskContent);
                newActionDiv.appendChild(editIcon);
                newActionDiv.appendChild(deleteIcon);
                newContentDiv.appendChild(newTextDiv);
                newContentDiv.appendChild(newActionDiv);
                newBacklogDiv.appendChild(newContentDiv);

              } else if (project.tasks[j].status == "in progress") {
                newTextDiv.appendChild(newTaskContent);
                newActionDiv.appendChild(editIcon);
                newActionDiv.appendChild(deleteIcon);
                newContentDiv.appendChild(newTextDiv);
                newContentDiv.appendChild(newActionDiv);
                newDoingDiv.appendChild(newContentDiv);

              } else if (project.tasks[j].status == "done") {
                newTextDiv.appendChild(newTaskContent);
                newActionDiv.appendChild(editIcon);
                newActionDiv.appendChild(deleteIcon);
                newContentDiv.appendChild(newTextDiv);
                newContentDiv.appendChild(newActionDiv);
                newDoneDiv.appendChild(newContentDiv);

              }

            }
          }

          pageContentDiv.appendChild(newRowDiv);
          contentWasWriten = true;
        }
      }
    }


    if (contentWasWriten == false) {
      var newErrorRowDiv = document.createElement('div');
      newErrorRowDiv.className = 'row';
      var newErrorDiv = document.createElement('div');
      newErrorDiv.className = 'column col-md-3';
      var errorMessage = document.createTextNode('This is an Empty Sprint. Add Backlog Items to it to use this view')


      newErrorDiv.appendChild(errorMessage);
      newErrorRowDiv.appendChild(newErrorDiv);
      pageContentDiv.appendChild(newErrorRowDiv);
      scrumDiv.appendChild(pageContentDiv);
    } else {
      scrumDiv.appendChild(pageContentDiv);
    }
  } else {
    var newErrorRowDiv = document.createElement('div');
    newErrorRowDiv.className = 'row';
    var newErrorDiv = document.createElement('div');
    newErrorDiv.className = 'column col-md-3';
    var errorMessage = document.createTextNode('There are no Sprints, please create a Sprint to use this view')


    newErrorDiv.appendChild(errorMessage);
    newErrorRowDiv.appendChild(newErrorDiv);
    scrumDiv.appendChild(newErrorRowDiv);
  }


  /*
   * Switcher Buttons
   */

  function sprintBack() {
    if ((sprintNumber - 1) < 0) {
      sprintNumber = (project.sprints.length - 1);
    } else {
      sprintNumber--;
    }
    var removeRow = document.getElementById('action_Row');
    scrumDiv.removeChild(removeRow);
    removeRow = document.getElementById('pageContentDiv');
    scrumDiv.removeChild(removeRow);
    siteContent();
  }

  function sprintForward() {
    if ((sprintNumber + 1) >= project.sprints.length) {
      sprintNumber = 0;
    } else {
      sprintNumber++;
    }
    var removeRow = document.getElementById('action_Row');
    scrumDiv.removeChild(removeRow);
    removeRow = document.getElementById('pageContentDiv');
    scrumDiv.removeChild(removeRow);
    siteContent();
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
    if (ev.target.id != '') {
      var taskID = data.substring(data.length - (data.length-1), data.length);
      var dataRow =  data.substring(data.length - data.length, (data.length - data.length) +1)

      if (dataRow == ev.target.id.substring(ev.target.id.length - 1, ev.target.id.length)) {


        if (ev.target.id.startsWith('backlog')) {
          ev.target.appendChild(document.getElementById(data));
          project.tasks[taskID].status = "to do";
          syncProjects();
        } else if (ev.target.id.startsWith('doing')) {
          ev.target.appendChild(document.getElementById(data));
          project.tasks[taskID].status = "in progress";
          syncProjects();
        } else if (ev.target.id.startsWith('done')) {
          ev.target.appendChild(document.getElementById(data));
          project.tasks[taskID].status = "done";
          syncProjects();
        }
      } else {
        alert('The task you wanna move is assign to another row.')
      }
    } else {
      alert('Not a valid target!')
    }

  }

}
function syncProjects() {

  ipcRenderer.send("PROJECTS", PROJECTS);
}



function calculateBacklogEffort(project) {
  if (project.backlogs.length != 0) {
    project.backlogs.forEach(iterateArray);

    function iterateArray(value, index, array) {
      let count = 0;
      value.taskIds.forEach(aggregateEffort);

      function aggregateEffort(value, index, array) {
        count = count + project.tasks.find(task => task.taskId === value).effort;
      }
      project.backlogs[index].estimated = count;
    }
  }
  else {
    return;
  }
}

function calculateEpicEffort(project) {
  if (project.epics.length != 0) {
    project.epics.forEach(iterateEpics);

    function iterateEpics(value, index, array) {
      let count = 0;
      value.backlogs.forEach(aggregateEffort);

      function aggregateEffort(value, index, array) {
        count = count + project.backlogs.find(backlog => backlog.backlogId === value).estimated;
      }
      project.epics[index].estimated = count;
    }
  }
  else {
    return;
  }
}