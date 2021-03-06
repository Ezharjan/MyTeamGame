const { app, BrowserWindow } = require('electron');


function createWindow() {
    // Create browser window
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('editor.html')

    //开发者工具
    // win.webContents.openDevTools();
    win.maximize()
}

app.whenReady().then(createWindow);