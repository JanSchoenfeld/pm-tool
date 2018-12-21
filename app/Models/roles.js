


class Roles {

    constructor(role) {

        this.master = false;
        this.owner = false;
        this.developer = false;

        if (role.toLowerCase() == "owner") {
            this.owner = true;
        } else if (role.toLowerCase() == "master") {
            this.master = true;
        } else if (role.toLowerCase() == "developer") {
            this.developer = true;
        }
    }
}

module.exports = Roles;