

window.onload = function() {

    checkNotifications()
};

const sleepTimeout = 60;

function checkNotifications() {
    let cont = 0;

    var comments = document.querySelectorAll('[aria-live="polite"]');
    // console.log(comments)

    for (var i = 0; i < comments.length; ++i) {
        let name = comments[i].querySelector('._1ht6 > span').innerHTML;
        document.title = name.substring(name.indexOf('-->')+3, name.lastIndexOf('<!')) + ' send a message';
    }

    setTimeout(function () {
        checkNotifications();
    }, sleepTimeout * 1000);
}