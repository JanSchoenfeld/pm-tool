const BacklogItem = require('./backlog-item');
const uuidv4 = require('uuid/v4');

class Project {

    constructor(title, description) {
        this.projectId = uuidv4();
        this.title = title;
        this.description = description;
        this.projectEstimate = null;
        this.epics = [];
        this.backlogs = [];
        this.assignedUsers = [];
        this.sprints = [];
        this.tasks = [];

        this.addEpic = function(newEpic){
            this.epics.push(newEpic);
        }

        this.addBacklog = function(newBacklog){
            this.backlogs.push(newBacklog);
        }

        this.addUser = function(newUser){
            this.assignedUsers.push(newUser);
        }
        
        this.addSprint = function(newSprint){
            this.sprints.push(newSprint);
        }

        this.addEpicCapture = function(newEpicCapture){
            this.epicCaptures.push(newEpicCapture);
        }

        this.addTask = function(newTask){
            this.tasks.push(newTask);
        }
    }
}

module.exports = Project;