const Roles = require('./roles');
const uuidv4 = require('uuid/v4');

//user evtl. einzeln für projekte anlegen - project.json datei vielleicht gut?

class User {

    constructor(name, role) {
        this.userId = uuidv4();
        this.createdAd = Date.now();
        this.name = name;
        this.role = new Roles(role);
        this.assignedTasks = [];
    }
}

module.exports = User;