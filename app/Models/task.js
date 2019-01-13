const User = require('./user.js');
const Status = require('./status.js')
let userId = 1;


class Task {

    constructor(title, description, effort) {

        this.taskId = userId++;
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.status = new Status("todo");
        this.effort = effort;
        //user aus project.users auslesen und als dropdown präsentieren
        this.assignedTo = [];

        this.addUser = function(newUser){
            this.assignedTo.push(newUser);
        }

    }

}

module.exports = Task;

