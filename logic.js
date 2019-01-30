const Task = require('./app/Models/task');
const Project = require('./app/Models/project');
const User = require('./app/Models/user');
const Sprint = require('./app/Models/sprint');
const BacklogItem = require('./app/Models/backlog-item');
const EpicCapture = require('./app/Models/epic-capture');
const fs = require('fs');
const path = require('path');
const {
    remote, ipcMain
} = require('electron');

/*
//new project
let testProject = new Project("Projektmanagement Tool", "Ein Tool für das agile Projektmanagement auf SCRUM Basis");
//erstelle neue user
let user1 = new User("Jan", "master");
let user2 = new User("Marvin", "developer");
let user3 = new User("Kerstin", "owner");
let user4 = new User("Luc", "developer"); 
//füge user zu projekt hinzu
testProject.addUser(user2);
testProject.addUser(user3);
testProject.addUser(user4);
//erstelle neue backlogs
//epic1
let backlog1 = new BacklogItem("Backlog Liste", "Es soll eine Übersicht aller Backlog Items verfügbar sein", "high");
let backlog2 = new BacklogItem("Funktionalität um Backlogs zu erstellen", "Der Owner soll die Möglichkeit haben neue Backlogitems zu erstellen", "high");
let backlog3 = new BacklogItem("Backlogs öffnen und bearbeiten", "Der Owner soll die Möglichkeit haben Backlogs zu öffnen und zu bearbeiten", "high");
//epic2
let backlog4 = new BacklogItem("Sprint Übersicht", "Anzeige einer Liste mit nicht zugewiesenen Sprints", "standard");
let backlog5 = new BacklogItem("Sprint erstellen", "Die Möglichkeit für den Scrum-Master neue Sprints zu erstellen", "high");
let backlog6 = new BacklogItem("Sprint öffnen", "Die Möglichkeit für den Scrum-Master einen Sprint zu öffnen und zu bearbeiten", "standard");
//epic3
let backlog7 = new BacklogItem("Auswahl von Sprints innerhalb des Boards", "Auswahlmöglichkeit um die Ansicht auf verschiedene Sprints zu wechseln", "standard");
let backlog8 = new BacklogItem("Aufteilung des Boards in Spalten", "Die Ansicht des Boards soll in Spalten unterteilt sein, je nach Task-Status", "high");
//ohne epic
let backlog9 = new BacklogItem("Effort-Estimation", "Implementieren der Effort-Estimation innerhalb des Tools", "low");
let backlog10 = new BacklogItem("Burn-Down-Chart", "Implementierung der Burn-Down-Chart innerhalb des Tools", "low");
let backlog11 = new BacklogItem("Roadmap", "Implementierung der Roadmap innerhalb des Tools", "low");
//erstelle neue epics
let epic1 = new EpicCapture("Product Backlog", "Volle Funktionalität rund um das Product Backlog", "high");
let epic2 = new EpicCapture("Sprint Planning", "Volle Funktionalität rund um Sprints", "high");
let epic3 = new EpicCapture("SCRUM Board", "Ansicht eines funktionalen Scrumboards zur Ansicht des Projektverlaufes", "high");
//erstelle neue tasks
//tasks für backlog1
let task1 = new Task("Programmierung der Listenansicht", "Implementierung der Listenansicht für die Backlogs", 2);
let task2 = new Task("Backend Klassenprogrammierung", "Programmierung der Klassen für das Backend", 1);
let task3 = new Task("Estimate Implementierung", "Programmierung der estimate funktion für Sprints/Backlogs/Epics", 2);
//tasks für backlog2
let task4 = new Task("Formular implementieren", "Formular für das Erstellen von Backlogs implementieren", 2);
let task5 = new Task("Backend Anbindung implementieren", "Verbindung des Formulars zum Backend implementieren", 3);
let task6 = new Task("Persistenz implementieren", "Neu erstellte Daten persisitieren", 4);
//tasks für backlog3
let task7 = new Task("Ansicht implementieren", "Detailansicht für Backlogs etc programmieren", 2);
let task8 = new Task("Bearbeitungsmöglichkeit implementieren", "Bearbeitbarkeit der Backlogs programmieren", 3);
//tasks für backlog4
let task9 = new Task("Sprint Ansicht", "Darstellung der Sprints in html implementieren", 3);
//tasks für backlog5
let task10 = new Task("Formular für Sprint-Erstellung", "Formular für das Anlegen eines neuen Sprints entwickeln", 2);
let task11 = new Task("Sprint Erstellung im Backend", "Backend Funktion für die Sprint Erstellung entwickeln", 2);
let task12 = new Task("Persistenz der Sprints", "Persistenz für neu erstellte Sprints möglich machen", 1);
//tasks für backlog6
let task13 = new Task("Formular entwickeln", "Entwickeln der Formulars für die Sprint Bearbeitung", 1);
let task14 = new Task("Formularlogik", "Entwickeln der Formularlogik", 3);
//tasks für backlog7
let task15 = new Task("Scrumboard entwerfen", "Html des Scrumboard entwickeln", 5);
let task16 = new Task("Scrumboard Logik", "Logik des Scrumboards entwickeln", 3);
let task17 = new Task("Drag & Drop", "Drag & Drop für Tasks implementieren", 6);
//tasks für backlog8
let task18 = new Task("Scrumboard-Spalten", "Scrumboard-Spalten entwickeln", 1);
//tasks für backlog9
let task19 = new Task("Implementieren der Effort-Estimation", "Implemntieren der Effort-Estimation", 7);
//tasks für backlog10
let task20 = new Task("Implementieren der Burn-Down-Chart", "Implementieren der Burn-Down-Chart", 7);
//tasks für backlog11
let task21 = new Task("Implementieren der Roadmap", "Implementieren der Roadmap", 6);
//erstelle neue sprints
let sprint1 = new Sprint("Sprint 1", "22-01-2019", "31-01-2019", 20);
let sprint2 = new Sprint("Sprint 2", "01-02-2019", "10-02-2019", 20);
let sprint3 = new Sprint("Sprint 3", "11-02-2019", "21-02-2019", 25);
//tasks zu backlogs hinzufügen
backlog1.addTask(task1);
backlog1.addTask(task2);
backlog1.addTask(task3);
backlog2.addTask(task4);
backlog2.addTask(task5);
backlog2.addTask(task6);
backlog3.addTask(task7);
backlog3.addTask(task8);
backlog4.addTask(task9);
backlog5.addTask(task10);
backlog5.addTask(task11);
backlog5.addTask(task12);
backlog6.addTask(task13);
backlog6.addTask(task14);
backlog7.addTask(task15);
backlog7.addTask(task16);
backlog7.addTask(task17);
backlog8.addTask(task18);
backlog9.addTask(task19);
backlog10.addTask(task20);
backlog11.addTask(task21);
//backlogs zu epics hinzufügen
epic1.addBacklog(backlog1);
epic1.addBacklog(backlog2);
epic1.addBacklog(backlog3);
epic2.addBacklog(backlog4);
epic2.addBacklog(backlog5);
epic2.addBacklog(backlog6);
epic3.addBacklog(backlog7);
epic3.addBacklog(backlog8);
//add backlogs to sprint
sprint1.addBacklog(backlog1);
sprint1.addBacklog(backlog2);
sprint1.addBacklog(backlog3);
sprint2.addBacklog(backlog4);
sprint2.addBacklog(backlog5);
sprint3.addBacklog(backlog6);
sprint3.addBacklog(backlog7);
sprint3.addBacklog(backlog8);
sprint3.addBacklog(backlog9);
//add backlogs to project
testProject.addBacklog(backlog1);
testProject.addBacklog(backlog2);
testProject.addBacklog(backlog3);
testProject.addBacklog(backlog4);
testProject.addBacklog(backlog5);
testProject.addBacklog(backlog6);
testProject.addBacklog(backlog7);
testProject.addBacklog(backlog8);
testProject.addBacklog(backlog9);
testProject.addBacklog(backlog10);
testProject.addBacklog(backlog11);
//add sprints to project
testProject.addSprint(sprint1);
testProject.addSprint(sprint2);
testProject.addSprint(sprint3); 
//add epics to project
testProject.addEpic(epic1);
testProject.addEpic(epic2);
testProject.addEpic(epic3);
//add tasks to project
testProject.addTask(task1);
testProject.addTask(task2);
testProject.addTask(task3);
testProject.addTask(task4);
testProject.addTask(task5);
testProject.addTask(task6);
testProject.addTask(task7);
testProject.addTask(task8);
testProject.addTask(task9);
testProject.addTask(task10);
testProject.addTask(task11);
testProject.addTask(task12);
testProject.addTask(task13);
testProject.addTask(task14);
testProject.addTask(task15);
testProject.addTask(task16);
testProject.addTask(task17);
testProject.addTask(task18);
testProject.addTask(task19);
testProject.addTask(task20);
testProject.addTask(task21);
let json = JSON.stringify(testProject, null, '\t');
fs.writeFileSync('./data/' + testProject.title.replace(/\s+/g, '').toLowerCase() + '.json', json, 'utf-8');
*/
let projects = [];

function run() {

    loadProjects();
    initGlobalsExchange();


}

function loadProjects() {

    fs.readdirSync(path.join(__dirname, '/data')).filter(fn => fn.endsWith('.json')).forEach(function (elem, idx) {

        // Load files from disk and load into global variable
        
        projects.push(JSON.parse(fs.readFileSync(path.join(__dirname, '/data/') + elem)));
        
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
        console.log("SYNCED PROJECTS");

    })

    // Getter for projects
    ipcMain.on("reqPROJECTS", function(event){

       event.sender.send("reqPROJECTSRenderer", projects)
        
    })
}

module.exports.run = run;