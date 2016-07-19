// Require the libraries used in the app
const path = require('path')
const {app, Tray, electron, Menu, BrowserWindow, ipcMain} = require('electron')
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

});

let appIcon = null

ipc.on('put-in-tray', function (event) {
    const iconName = process.platform === 'win32' ? 'icon.png' : 'icon.png'
    const iconPath = path.join(__dirname, iconName)
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([{
        label: 'Remove',
        click: function () {
            event.sender.send('tray-removed')
            appIcon.destroy()
        }
    }])
    appIcon.setToolTip('Electron Demo in the tray.')
    appIcon.setContextMenu(contextMenu)
})