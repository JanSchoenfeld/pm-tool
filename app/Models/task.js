const User = require('./user.js');
let userId = 1;


class Task {

    constructor(title, description, effort) {

        this.taskId = userId++;
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.finished = false;
        this.effort = effort;
        //user aus project.users auslesen und als dropdown präsentieren
        this.assignedTo = null;

    }

}

module.exports = Task;

