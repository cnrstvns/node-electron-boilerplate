const { app, BrowserWindow } = require('electron');
const { join } = require('path');

let mainWindow;

async function createWindow(){
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: true,
        devTools: true,
        autoHideMenuBar: true
    })

    await mainWindow.loadFile(join(__dirname + '/index.html'));
}

app.once("ready", createWindow);
