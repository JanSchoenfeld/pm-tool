const Project = require('./project');

let sprintId = 1;

class Sprint {
    constructor(name, startdate, enddate, backlogs, project) {

        this.sprintId = sprintId++;
        this.createdAt = Date.now();
        this.name = name;
        //wie date bei sprintanlegung feststellen?
        this.startdate = startdate;
        this.enddate = enddate;
        this.backlogs = backlogs;
        //wie project handlen?
        this.project = Project;
    }
}

module.exports = Sprint;