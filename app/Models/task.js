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
        //user bei taskerstellung angeben? 
        this.assignedTo = null;

    }

}

module.exports = Task;

