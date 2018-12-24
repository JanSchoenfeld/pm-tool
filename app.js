const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const Roles = require('./app/Models/roles');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');
const Status = require('./app/Models/status');
const BacklogItem = require ('./app/Models/backlog-item');


let testTask = new Task("Scrumboard", "Scrumboard erstellen und füllen", 5);
let testTask2 = new Task("Backend", "Backend programmieren", 5);
let testUser = new User("Kerstin", "Owner");
let testUser2 = new User("Jan", "Developer");
let testStatus = new Status("TO DO    ");
let testSpring = new Sprint("Sprint 1", Date.now(), "March", )
let testBacklogItem = new BacklogItem("Bugfixing", "Bugs finden und fixen", "to do ", "high", 2, )

testTask.assignedTo = testUser;

console.log(testStatus);
console.log(testUser2);
//console.log(testTask);