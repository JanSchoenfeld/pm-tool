const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const Roles = require('./app/Models/roles');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');
const Status = require('./app/Models/status');
const BacklogItem = require('./app/Models/backlog-item');
const fs = require('fs');
const {
    remote, ipcMain
} = require('electron');

let projects = [];

function test() {

    let deine_mudder = 'erfolgreich!';
    console.log(`Test ${deine_mudder}`);

}

function run() {

    test();
    loadProjects();
    //console.log(global.PROJECTS.length);
    initGlobalsExchange();


}

function loadProjects() {

    fs.readdirSync('./data/').filter(fn => fn.endsWith('.json')).forEach(function (elem, idx) {

        // Load files from disk and load into global variable
        
        projects.push(JSON.parse(fs.readFileSync('./data/' + elem)));
        
        /*
        if(idx === fs.readdirSync('./data/').filter(fn => fn.endsWith('.json')).length-1){
            ipcMain.send("loadProjects", projects);
        }
        */
    });
}


function initGlobalsExchange(){

    // setter for projects
    ipcMain.on("PROJECTS", function(event, PROJECTS){

        projects = PROJECTS;
        console.log("SYNCED PROJECTS 111!!11");

    })

    // Getter for projects
    ipcMain.on("reqPROJECTS", function(event){

       event.sender.send("reqPROJECTSRenderer", projects)
        
    })
}

module.exports.run = run;