const BacklogItem = require('./backlog-item');

let projectId = 1;

class Project {

    constructor(title, description) {
        this.projectId = projectId++;
        this.title = title;
        this.description = description;
        this.backlogs = [];
        this.assignedUsers = [];
        this.sprints = [];

        this.addBacklog = function(newBacklog){
            this.backlogs.push(newBacklog);
        }

        this.addUser = function(newUser){
            this.assignedUsers.push(newUser);
        }
        
        this.addSprint = function(newSprint){
            this.sprints.push(newSprint);
        }
    }
}

module.exports = Project;