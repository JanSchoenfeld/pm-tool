const Status = require('./status');
const Priority = require('./priority');
const uuidv4 = require('uuid/v4');

class BacklogItem {

    constructor(title, description, backlog_item_priority) {
            this.backlogId = uuidv4();
            this.createdAt = Date.now();
            this.title = title;
            this.description = description;
            this.backlog_status = "to do"
            this.priority = backlog_item_priority
            this.estimated = null;
            //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
            this.taskIds = [];
            //this.isInSprint = false;
            //this.isInEpic = false;
            this.inSprint = null;
            this.inEpic = null;

            this.addTask = function (newTask){
                newTask.inBacklog = this.backlogId;
                this.taskIds.push(newTask.taskId);
            }
            
        }
}

module.exports = BacklogItem;