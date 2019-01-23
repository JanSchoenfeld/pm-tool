    const fs = require('fs');
    const {
        remote,
        ipcRenderer
    } = require('electron');

    //lad das globale array der projekte


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
                fs.writeFileSync('data/global/POSITION.json', idx);
                window.location.href = 'scrumboard.html';
            })
            document.getElementsByClassName('start-menu')[0].insertBefore(button, document.getElementById('startNew'));
        });
    })
        
    ipcRenderer.send("reqPROJECTS");

    /*
    button.addEventListener('click', e => {

        //Viel Spaß
    })
    */