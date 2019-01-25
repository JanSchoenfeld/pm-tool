const User = require('./user.js');
const Status = require('./status.js')
const uuidv4 = require('uuid/v4');


class Task {

    constructor(title, description, effort) {

        this.taskId = uuidv4();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.status = "to do"
        this.effort = effort;
        this.assignedTo = null;
        this.inBacklog = null;

        this.addUser = function(newUser){
            newUser.assignedTasks.push(this.taskId);
            this.assignedTo.push(newUser.userId);
        }

    }

}

module.exports = Task;

