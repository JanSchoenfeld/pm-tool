const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const Roles = require('./app/Models/roles');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');
const Status = require('./app/Models/status');
const BacklogItem = require('./app/Models/backlog-item');
const fs = require('fs');
const {
    remote
} = require('electron');

/*
let testProject = new Project("PM Tool", "Projektmanagement Tool auf Scrum-Basis");
let testTask = new Task("Scrumboard", "Scrumboard erstellen und füllen", 5);
let testBacklogItem = new BacklogItem("Bugfixing", "Bugs finden und fixen", "to do ", "high", 3);
let testSprint = new Sprint("Sprint 1", Date.now(), "March")
let testUser = new User("Kerstin", "Owner");
let testStatus = new Status("TO DO    ");

testBacklogItem.addTask(testTask);
testBacklogItem.addTask(new Task("BurndownChart", "blabla", 5))
testProject.addBacklog(testBacklogItem);
testBacklogItem.backlog_status = testStatus;
testProject.addUser(testUser);


var json = JSON.stringify(testProject, null, '\t');
fs.writeFileSync('./data/' + testProject.title.replace(/\s+/g, '').toLowerCase() + '.json', json, 'utf-8')
*/

global.PROJECTS = [];

function test() {

    let deine_mudder = 'erfolgreich!';
    console.log(`Test ${deine_mudder}`);

}

function run() {

    test();
    loadProjects();
    console.log(global.PROJECTS.length);


}

function loadProjects() {

    fs.readdirSync('./data/').filter(fn => fn.endsWith('.json')).forEach(function (elem, idx) {

        // Load files from disk and load into global variable
        global.PROJECTS.push(JSON.parse(fs.readFileSync('./data/' + elem)));
    });
}

module.exports.run = run;