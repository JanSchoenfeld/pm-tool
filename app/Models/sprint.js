const uuidv4 = require('uuid/v4');

class Sprint {
    constructor(name, startdate, enddate, capacity) {

        this.sprintId = uuidv4();
        this.createdAt = Date.now();
        this.name = name;
        this.startdate = startdate;
        this.enddate = enddate;
        this.capacity = capacity;
        this.backlogs = [];

        this.addBacklog = function (newBacklog) {
            newBacklog.inSprint = this.sprintId;
            this.backlogs.push(newBacklog.backlogId);
        }

    }
}

module.exports = Sprint;