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
            this.backlog_status = backlog_status;
            this.priority = new Priority(backlog_item_priority);
            this.estimated = estimated;
            //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
            this.tasks = [];
            this.isInSprint = false;
            this.isInEpic = false;
            this.inSprint = "";
            this.inEpic = "";
            

            this.addTask = function (newTask){
                this.tasks.push(newTask);
            }
        }
}

module.exports = BacklogItem;