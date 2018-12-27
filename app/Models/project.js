const BacklogItem = require('./backlog-item');

let projectId = 1;

class Project {

    constructor(title, description) {
        this.projectId = projectId++;
        this.title = title;
        this.description = description;
        this.backlogs = null;
        this.assignedUser = {};
    }
}

module.exports = Project;