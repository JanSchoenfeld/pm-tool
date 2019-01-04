const BacklogItem = require('./backlog-item');

let projectId = 1;

class Project {

    constructor(title, description) {
        this.projectId = projectId++;
        this.title = title;
        this.description = description;
        this.backlogs = [];
        this.assignedUsers = [];

        this.addBacklog = function(newBacklog){
            this.backlogs.push(newBacklog);
        }

        this.addUser = function(newUser){
            this.assignedUsers.push(newUser);
        }
    }
}

module.exports = Project;