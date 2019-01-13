'use strict'

//import logic to make global.project work
const logic = require('../logic')

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')

console.log("Location of the log: renderer.js " + global.project.backlogs[0].title)