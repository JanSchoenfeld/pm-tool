class Status {

    constructor(status) {

        this.to_do = false;
        this.in_progress = false;
        this.done = false;

        if (status.replace(/\s+/g, '').toLowerCase() == "todo") {
            this.to_do = true;
            this.in_progress = false;
            this.done = false;
        } else if (status.replace(/\s+/g, '').toLowerCase() == "inprogress") {
            this.in_progress = true;
            this.to_do = false;
            this.done = false;
        } else if (status.replace(/\s+/g, '').toLowerCase() == "done") {
            this.done = true;
            this.in_progress = false;
            this.to_do = false;
        }

        this.changeStatus = function (newStatus) {
            if (newStatus.replace(/\s+/g, '').toLowerCase() == "todo") {
                this.to_do = true;
                this.in_progress = false;
                this.done = false;
            } else if (newStatus.replace(/\s+/g, '').toLowerCase() == "inprogress") {
                this.in_progress = true;
                this.to_do = false;
                this.done = false;
            } else if (newStatus.replace(/\s+/g, '').toLowerCase() == "done") {
                this.done = true;
                this.in_progress = false;
                this.to_do = false;
            }
        }

    }
}

module.exports = Status;