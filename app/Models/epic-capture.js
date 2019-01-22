const Priority = require('./priority');
const Status = require('./status');
const uuidv4 = require('uuid/v4');


class EpicCapture{



    constructor(title, description, epic_priority) {
        this.epicId = uuidv4();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.epic_status = "to do";
        this.priority = new Priority(epic_priority);
        this.estimated = null;
        //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
        this.backlogs = [];


        this.addBacklog = function (newBacklog){
            newBacklog.inEpic = this.epicId;
            this.backlogs.push(newBacklog.backlogId);
        }
    }
}

module.exports = EpicCapture;