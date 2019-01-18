const BacklogItem = require('./backlog-item');
const uuidv4 = require('uuid/v4');

class Project {

    constructor(title, description) {
        this.projectId = uuidv4();
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