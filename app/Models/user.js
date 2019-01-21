const Roles = require('./roles');
const uuidv4 = require('uuid/v4');

//user evtl. einzeln für projekte anlegen - project.json datei vielleicht gut?

class User {

    constructor(name, role) {
        this.userId = uuidv4();
        this.name = name;
        //role später als dropdown im formular
        this.role = new Roles(role);
    }
}

module.exports = User;