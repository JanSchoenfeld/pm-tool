const Priority = require('./priority');
const uuidv4 = require('uuid/v4');


class EpicCapture{



    constructor(title, description, epic_status, epic_priority, estimated) {
        this.epicId = uuidv4();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.epic_status = epic_status;
        this.priority = new Priority(epic_priority);
        this.estimated = estimated;
        //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
        this.backlogs = [];


        this.addBacklog = function (id){
            this.backlogs.push(id);
        }
    }
}

module.exports = EpicCapture;