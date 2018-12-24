const Project = require('./project');
const BacklogItem = require('./backlog-item');

let sprintId = 1;

class Sprint {
    constructor(name, startdate, enddate, project) {

        this.sprintId = sprintId++;
        this.createdAt = Date.now();
        this.name = name;
        //wie date bei sprintanlegung feststellen?
        this.startdate = startdate;
        this.enddate = enddate;
        this.backlogs = null;
        //wie project handlen?
        this.project = project;
    }
}

module.exports = Sprint;