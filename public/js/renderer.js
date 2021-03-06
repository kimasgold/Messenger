const $ = require('jquery');
const {remote, ipcRenderer} = require('electron');

const ipc = require('electron').ipcRenderer

const trayBtn = document.getElementById('put-in-tray')
let trayOn = false
const sleepTimeout = 60;

$(document).ready(function () {



    //controls
    $('.mini').on("click", function (e) {
        const window = remote.getCurrentWindow();
        window.minimize()
    });

    $('.max').on("click", function (e) {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize()
        } else {
            window.unmaximize()
        }
    });

    $('.close').on("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close()
    });

    //custom css fix
    let tb = document.querySelector('#fb-view');
    tb.addEventListener('dom-ready', function () {
        tb.openDevTools();
        tb.insertCSS(` *:focus{outline:none;} body {overflow-y: hidden !important;} ._210n{bottom: 10px !important;}`)
    });

    tb.addEventListener('page-title-updated', function () {
        console.log(document.querySelector('#fb-view').getTitle());
        sendNotification(document.querySelector('#fb-view').getTitle())
    })

})

function checkNotifications() {



    // setTimeout(function () {
    //     checkNotifications();
    // }, sleepTimeout * 1000);
}

let notif = [
    {
        title: "New message",
        body: "New message"
    }]
let bootNotif = true;

function sendNotification(m) {
//Title auto pakeicia jeigu yra zinute
//     if(!bootNotif){
//         notif[0].body = m;
//         new Notification(notif[0].title, notif[0]);
//         bootNotif = true;
//     }

    const substring = "send a message";
    if (m != "0" && m.indexOf(substring) > -1 && m.indexOf("(") == -1 && m != notif[0].title && bootNotif){
        notif[0].title = m;
        new Notification(notif[0].title, notif[0]);
    }
}

ipcRenderer.on('tray-removed', function () {
    trayOn = false
    document.getElementById('tray-countdown').innerHTML = ''
})