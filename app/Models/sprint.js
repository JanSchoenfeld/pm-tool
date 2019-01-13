const Project = require('./project');
const BacklogItem = require('./backlog-item');

let sprintId = 1;

class Sprint {
    constructor(name, startdate, enddate, capacity) {

        this.sprintId = sprintId++;
        this.createdAt = Date.now();
        this.name = name;
        //wie date bei sprintanlegung feststellen?
        this.startdate = startdate;
        this.enddate = enddate;
        this.capacity = capacity;
        //referenz zu backlog?
        this.backlogs = [];

        this.addBacklog = function (newBacklog){
            this.backlogs.push(newBacklog);
            newBacklog.isInSprint = true;
        }
    }
}

module.exports = Sprint;