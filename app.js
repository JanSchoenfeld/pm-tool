const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const Roles = require('./app/Models/roles');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');


var task = new Task("Scrumboard", "Scrumboard erstellen und füllen", 5);
var task2 = new Task("Backend", "Backend programmieren", 5);
var user2 = new User("Kerstin", "Owner");
var user3 = new User("Jan", "BOSS");

task.assignedTo = user2;
task2.assignedTo = user3;

console.log(task);
console.log(task2);