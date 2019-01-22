const uuidv4 = require('uuid/v4');

class Sprint {
    constructor(name, startdate, enddate, capacity) {

        this.sprintId = uuidv4();
        this.createdAt = Date.now();
        this.name = name;
        //wie date bei sprintanlegung feststellen?
        this.startdate = startdate;
        this.enddate = enddate;
        this.capacity = capacity;
        //referenz zu backlog?
        this.backlogs = [];

        this.addBacklog = function (newBacklog){
            newBacklog.inSprint = this.sprintId;
            this.backlogs.push(newBacklog.backlogId);
        }
    }
}

module.exports = Sprint;