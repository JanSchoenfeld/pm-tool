const Task = require('./task');
const Project = require('./project');
const Roles = require('./roles');
const User = require('./user');
const Sprint = require('./sprint');
const Status = require('./status');
const Priority = require('./priority');
const uuidv4 = require('uuid/v4');

class BacklogItem {

    constructor(title, description, /*backlog_status,*/ backlog_item_priority, estimated) {
            this.backlogId = uuidv4();
            this.createdAt = Date.now();
            this.title = title;
            this.description = description;
            this.backlog_status = new Status("to do");
            this.priority = new Priority(backlog_item_priority);
            this.estimated = estimated;
            //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
            //this.tasks = [];
            //this.isInSprint = false;
            //this.isInEpic = false;
            this.inSprint = null;
            this.inEpic = null;

            this.addTask = function (id){
                this.tasks.push(id);
            }
        }
}

module.exports = BacklogItem;