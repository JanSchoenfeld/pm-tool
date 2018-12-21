class Priority {

    constructor(priority){
        
        this.low = false;
        this.standard = false;
        this.high = false;
        this.priority = priority.replace(/\s+/g, '').toLowerCase();

        if(this.priority == "low"){
            this.low = true;
        }
        else if(this.priority == "standard"){
            this.standard = true;
        }
        else if(this.priority == "high"){
            this.high = true;
        }
        //default auf standard
        else{
            this.standard = true;
        }

    }
}

module.exports = Priority;