    const { remote } = require('electron');
    
    let PROJECTS = remote.getGlobal('PROJECTS');
    global.POSITION = 'asd';
    console.log(global.POSITION);

    //document.getElementsByClassName('start-menu')[0].appendChild('')

    PROJECTS.forEach((element, idx) => {
        let button = document.createElement("button");
        button.className = 'btn btn-primary btn-lg btn-block';
        button.innerHTML = element.title;
        button.addEventListener('click', e => {
            global.POSITION = idx;
            window.location.href = 'scrumboard.html';
            console.log(global.POSITION)
        })
        document.getElementsByClassName('start-menu')[0].insertBefore(button, document.getElementById('startNew'));
    });




   // console.log(global.POSITION);
/*
button.addEventListener('click', e => {

    //Viel Spaß
})
*/

module.exports.POSITION = POSITION;