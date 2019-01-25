'use strict'

const electron = require('electron')
const url = require('url')
const path = require('path')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow
const logic = require(path.join(__dirname, 'logic.js'))

app.setName(config.productName)

var mainWindow = null

app.on('ready', function () {

  logic.run();

  mainWindow = new BrowserWindow({
    backgroundColor: 'lightgray',
    title: config.productName,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/app/intro.html'),
    protocol: 'file',
    slashes: true
  }));

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    //mainWindow.setMenu(null)
    mainWindow.maximize();
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  app.quit()
})