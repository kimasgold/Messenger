// Require the libraries used in the app
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

let mainWindow

// Kill the app when all windows are closed
app.on('mainWindow-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {
    // Create the main window for the app
    mainWindow = new BrowserWindow({
        title: "Messenger",
        icon: __dirname + '/icon.ico',
        width: 410,
        height: 610,
        minWidth: 410,
        minHeight: 610,
        titleBarStyle: 'hidden',
        transparent: true,
        resizable: true,
        frame: false,
        webSecurity: false
    });

    // Load in our content
    mainWindow.loadURL(`file://${__dirname}/views/index.html`);

    mainWindow.webContents.openDevTools()
    // Ensure that garbage collection occurs when the window is closed
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});