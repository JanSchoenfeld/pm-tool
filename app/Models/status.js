class Status {

    constructor(status){
        this.to_do = false;
        this.in_progress = false;
        this.done = false;
        this.status = status.replace(/\s+/g, '').toLowerCase();

        if(this.status == "todo"){
            this.to_do = true;
        }
        else if(this.status == "inprogress"){
            this.in_progress = true;
        }
        else if(this.status == "done"){
            this.done = true;
        }

    }
}

module.exports = Status;