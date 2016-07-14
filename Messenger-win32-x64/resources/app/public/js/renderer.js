const $ = require('jquery');
const {remote} = require('electron');
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

    checkNotifications()
})

function checkNotifications() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.facebook.com/home.php', true);
    xhr.onreadystatechange = function () {
        console.log(xhr)
        if (xhr.readyState == 4) {
            var xmlDoc = xhr.responseText;

            if (xmlDoc.indexOf('notificationsCountValue') > 0) {
                loc = xmlDoc.indexOf('messagesCountValue');
                if (loc > 0) {
                    var myString = xmlDoc.substr(loc, 80);
                    var c = parseInt(myString.substring(myString.indexOf('>') + 1, myString.indexOf('<')));
                    sendNotification(c);
                }
            }
        }
        else return;
    }
    xhr.send(null);
    setTimeout(function () {
        checkNotifications();
    }, sleepTimeout * 1000);
}

const options = [
    {
        title: "New message",
        body: "Short message part"
    }]
function sendNotification(m) {
    console.log(m)
    new Notification(options[0].title, options[0]);
}