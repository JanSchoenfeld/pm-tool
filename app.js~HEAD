const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const Roles = require('./app/Models/roles');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');
const Status = require('./app/Models/status');
const BacklogItem = require('./app/Models/backlog-item');
const fs = require('fs');

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
let project = JSON.parse(fs.readFileSync('./data/pmtool.json'));

console.log(project.backlogs[0].tasks)