const Task = require('./task');
const Project = require('./project');
const Roles = require('./roles');
const User = require('./user');
const Sprint = require('./sprint');
const Status = require('./status');
const Priority = require('./priority');

let backlogId = 1;

class BacklogItem {

    constructor(title, description, backlog_status, backlog_item_priority, 
        estimation, sprint, tasks, estimated, project) {
            this.backlogId = backlogId++;
            this.createdAt = Date.now();
            this.title = title;
            this.description = description;
            this.backlog_status = new Status(backlog_status);
            this.priority = new Priority(backlog_item_priority);
            this.estimation = estimation;
            //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
            this.sprint = sprint;
            this.tasks = tasks;
            this.estimated = estimated;
            this.project = project;
        }
}

module.exports = BacklogItem;