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
let project;
let POSITION = fs.readFileSync('data/global/POSITION.json');

ipcRenderer.on("reqPROJECTSRenderer", function (event, projects) {

    PROJECTS = projects;
    project = PROJECTS[POSITION]
})

ipcRenderer.send("reqPROJECTS");

document.getElementById("btn_next").onclick = function () {
    let tmp = parseInt(document.getElementById("edit_t_p_item_position").value);
    if (tmp < project.tasks.length - 1) {
        tmp++;
        displayPoker(tmp);
    } else {
        alert("Last Item reached")
    }
};

document.getElementById("btn_previous").onclick = function () {
    let tmp = parseInt(document.getElementById("edit_t_p_item_position").value);
    if (tmp > 0) {
        tmp--;
        displayPoker(tmp);
    } else {
        alert("First Item reached")
    }
};

function reload() {
    location.reload();

}

function syncProjects() {
    ipcRenderer.send("PROJECTS", PROJECTS);
}

function displayPoker(i) {
    console.log("Display Poker: " + i);
    document.getElementById("edit_t_p_item_position").value = i;
    document.getElementById("form_planningPoker").reset();
    document.getElementById("edit_t_p_item_name").value = project.tasks[i].title;
    document.getElementById("edit_t_p_item_description").value = project.tasks[i].description;
    document.getElementById("edit_t_p_item_estimate_time").value = project.tasks[i].effort;
    document.getElementById("edit_t_p_item_id").value = project.tasks[i].taskId;
    let selectedBacklog = project.tasks[i].inBacklog;
    let selectedUser = project.tasks[i].assignedTo;

    let selectBacklog = document.getElementById("edit_t_p_item_assign_to_backlog");
    $("#edit_t_p_item_assign_to_backlog").empty();
    selectBacklog.options[selectBacklog.options.length] = new Option("", "");
    for (let i = 0; i < project.backlogs.length; i++) {
        let id = project.backlogs[i].backlogId;

        if (selectedBacklog === id) {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + project.backlogs[i].title, id, false, true);
        } else {
            selectBacklog.options[selectBacklog.options.length] = new Option("Backlog: " + project.backlogs[i].title, id);
        }
    }
    let selectUser = document.getElementById("edit_t_p_item_assign_to_user");
    $("#edit_t_p_item_assign_to_user").empty();
    selectUser.options[selectUser.options.length] = new Option("", "");
    for (let i = 0; i < project.assignedUsers.length; i++) {
        let id = project.assignedUsers[i].userId;

        if (selectedUser === id) {
            selectUser.options[selectUser.options.length] = new Option("User: " + project.assignedUsers[i].name, id, false, true);
        } else {
            selectUser.options[selectUser.options.length] = new Option("User: " + project.assignedUsers[i].name, id);
        }
    }
    let selectStatus = document.getElementById("edit_t_p_item_status");
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

    document.getElementById("edit_t_p_item_position").value = i;

    $("#modal_planningPoker").modal("show");



}

function closePoker() {
    $("#modal_planningPoker").modal("hide");
}

function startPoker() {
    displayPoker(0);
}

function saveTaskPoker() {
    let item_estimate_time = document.getElementById("edit_t_p_item_estimate_time").value;
    let item_id = document.getElementById("edit_t_p_item_id").value;
    let item_position = document.getElementById("edit_t_p_item_position").value;

    if (item_estimate_time === "") {
        alert("Please Select Effort");
        return;
    } else {
        project.tasks[item_position].effort = parseInt(item_estimate_time);
    }

    PROJECTS[POSITION] = project;

    syncProjects();
}