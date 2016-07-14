

window.onload = function() {

    checkNotifications()
};


document.ready = function () {
    $( document ).ajaxStop(function() {
        console.log("ready")
    });
}
const sleepTimeout = 60;
const elements = document.querySelectorAll('._5l-3');
console.log(elements)
function checkNotifications() {
    let cont = 0;

    var comments = document.getElementsByClassName('_5l-3');
    for (var i = 0, len = comments.length; i < len; i++) {
        var comment = comments[i];

        comment.innerHTML = html;
    }
    Array.prototype.forEach.call(elements, function(el, i){

        if (el.getAttribute("aria-live") == "polite"){
            cont++;
            console.log('find')
        }
        // document.title = cont;
            // + "/" + document.qeurySelectorAll('._1ht6').innerHTML();
    });
    document.title = cont;
    console.log(cont);


    setTimeout(function () {
        checkNotifications();
    }, sleepTimeout * 1000);
}