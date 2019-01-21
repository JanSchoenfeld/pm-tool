const User = require('./user.js');
const Status = require('./status.js')
const uuidv4 = require('uuid/v4');


class Task {

    constructor(title, description, effort) {

        this.taskId = uuidv4();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.status = new Status("todo");
        this.effort = effort;
        //user aus project.users auslesen und als dropdown präsentieren
        this.assignedTo = [];
        this.inBacklog = null;

        this.addUser = function(id){
            this.assignedTo.push(id);
        }

    }

}

module.exports = Task;

