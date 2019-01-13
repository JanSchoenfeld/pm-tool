const Priority = require('./priority');

let epicId = 1;

class Epic{



    constructor(title, description, epic_status, epic_priority, estimated) {
        this.epicId = epicId++;
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.epic_status = epic_status;
        this.priority = new Priority(epic_priority);
        this.estimated = estimated;
        //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
        this.backlogs = [];
        

        this.addBacklog = function (newBacklog){
            this.backlogs.push(newBacklog);
        }
    }
}

module.exports = BacklogItem;