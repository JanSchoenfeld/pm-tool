const Roles = require('./roles');

let userId = 1;

//user evtl. einzeln für projekte anlegen - project.json datei vielleicht gut?

class User {

    constructor(name, role) {
        this.userId = userId++;
        this.name = name;
        //role später als dropdown im formular
        this.role = new Roles(role);
    }
}

module.exports = User;