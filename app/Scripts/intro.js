    const fs = require('fs');
    const path = require('path')
    const {
        remote,
        ipcRenderer,
    } = require('electron');

    //lad das globale array der projekte
    const Project = require('../app/Models/project');

    let PROJECTS;
    ipcRenderer.on("reqPROJECTSRenderer", function(event, projects){

        PROJECTS = projects;

        //für jedes projekt wird ein neuer button generiert
        PROJECTS.forEach((element, idx) => {
            let button = document.createElement("button");
            button.className = 'btn btn-primary btn-lg btn-block';
            button.innerHTML = element.title;
            button.addEventListener('click', e => {
                //schreibe die position des projektes auf platte in POSITION.json damit die später in
                //scrumboard.js ausgelesen werden kann (hier mit umweg gelöst, das schwierigkeiten vorlagen)
                fs.writeFileSync(path.join(__dirname, '../data/global/POSITION.json'), idx);
                window.location.href = 'scrumboard.html';
            })
            document.getElementsByClassName('start-menu')[0].insertBefore(button, document.getElementById('startNew'));
        });
    })
        
    ipcRenderer.send("reqPROJECTS");

    function syncProjects() {

        ipcRenderer.send("PROJECTS", PROJECTS);

    }

    function reload() {
        location.reload();

    }

    //Displays Modal to add a Project
    function displayAddProject() {
        document.getElementById("form_addProject").reset();
        $("#modal_add_project").modal("show");
    }

    //Add new Project to DataStore
    function addProject() {
        alert("Das neue Projekt wird nach Neustart der Anwendung angezeigt!")
        let item_name = document.getElementById("p_name").value;
        let item_description = document.getElementById("p_description").value;
        let newProject = new Project(item_name, item_description);
        console.log(newProject);

        //TODO: Jan: Hier Project anlegen, Objekt ist erstellt
        let json = JSON.stringify(newProject, null, '\t');
        fs.writeFileSync(path.join(__dirname,'../data/') + newProject.title.replace(/\s+/g, '').toLowerCase() + '.json', json, 'utf-8');

        syncProjects();
        closeAddProject();
        reload();
    }

    //Close Modal to add a Project
    function closeAddProject() {
        document.getElementById("form_addProject").reset();
        $("#modal_add_project").modal('hide');
    }


    /*
    button.addEventListener('click', e => {

        //Viel Spaß
    })
    */