class Status {

    constructor(status){
        this.to_do = false;
        this.in_progress = false;
        this.done = false;

        if(status.replace(/\s+/g, '').toLowerCase() == "todo"){
            this.to_do = true;
        }
        else if(status.replace(/\s+/g, '').toLowerCase() == "inprogress"){
            this.in_progress = true;
        }
        else if(status.replace(/\s+/g, '').toLowerCase() == "done"){
            this.done = true;
        }

    }
}

module.exports = Status;