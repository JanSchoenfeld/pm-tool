const BacklogItem = require('./backlog-item');

let projectId = 1;

class Project {

    constructor(title, content, backlogs) {
        this.projectId = projectId++;
        this.title = title;
        this.content = content;
        this.backlogs = backlogs;
        this.assignedUser = {};
    }
}

module.exports = Project;