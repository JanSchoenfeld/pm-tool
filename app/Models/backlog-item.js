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
        this.inSprint = null;
        this.inEpic = null;
        this.taskIds = [];

        this.addTask = function (newTask) {
            newTask.inBacklog = this.backlogId;
            this.taskIds.push(newTask.taskId);
        }

    }
}

module.exports = BacklogItem;