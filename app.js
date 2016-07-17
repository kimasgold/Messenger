// Require the libraries used in the app
const {app, Tray, electron, Menu, BrowserWindow} = require('electron')
// Module to control application life.
// const app = electron.app
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow

let mainWindow
let tray = null

// Kill the app when all windows are closed
app.on('mainWindow-all-closed', () => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', () => {
    // Create the main window for the app
    mainWindow = new BrowserWindow({
        title: "Messenger",
        icon: __dirname + '/icon.ico',
        width: 410,
        height: 610,
        minWidth: 410,
        minHeight: 610,
        transparent: true,
        resizable: true,
        frame: false,
        autoHideMenuBar: false,
        webPreferences: {
            webSecurity: true
        }
    });

    // Load in our content
    mainWindow.loadURL(`file://${__dirname}/views/index.html`);

    mainWindow.webContents.openDevTools()
    // Ensure that garbage collection occurs when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });



        tray = new Tray('icon.png')
        const contextMenu = Menu.buildFromTemplate([
            {label: 'Item1', type: 'radio'},
            {label: 'Item2', type: 'radio'},
            {label: 'Item3', type: 'radio', checked: true},
            {label: 'Item4', type: 'radio'}
        ]);
        tray.setToolTip('This is my application.')
        tray.setContextMenu(contextMenu)

});