// We query the timer object. We want it to be of type
// HTMLHeadingElement so that it can only
// receive a heading element.
// Other type could have been HTMLElement, an interface for all html elements
// but it's a larger type.
var timer = document.querySelector("#timer");
// This wil set the size of the timer
timer.style.fontSize = timer.offsetWidth / 2 + "px";
// We'll search for the query params in the url
var loc = window.location;
var minutes = loc.search.split("?")[1];
var doc = document.querySelector("#minutes");
// If there is a minute query param, we'll set the innerHTML
// of #minutes to that value.
// That means that we always start with NUMBER:00 as a default,
// i.e the minutes values is always 0 at the start.
if (minutes) {
    doc.innerHTML = minutes;
}
else {
    doc.innerHTML = "5";
}
var sec = document.querySelector("#seconds");
sec.innerHTML = "00";
function getAsNumberFromQS(id) {
    var sec = document.querySelector(id);
    return parseInt(sec.innerHTML);
}
function updateByQS(id, value) {
    var domEl = document.querySelector(id);
    domEl.innerHTML = value;
}
function tick() {
    var secnum = getAsNumberFromQS("#seconds");
    if (secnum === 0) {
        var minnum = getAsNumberFromQS("#minutes");
        // If the minutes is 0, we'll stop the timer.
        // as it means that we have reached 00:00
        if (minnum === 0) {
            clearInterval(ticker_interv);
        }
        else {
            // Here, the seconds is 0, so we'll set it back to
            //59 and decrement the minutes.
            updateByQS("#seconds", "59");
            updateByQS("#minutes", (minnum - 1).toString());
        }
    }
    else {
        // We're not at MIN:00, so we'll just decrement the seconds.
        var new_secnum = (secnum - 1).toString();
        if (new_secnum.length === 1) {
            new_secnum = "0" + new_secnum;
        }
        updateByQS("#seconds", new_secnum);
    }
}
var ticker_interv = setInterval(tick, 1000);
window.onresize = function () {
    // Reupdate the font size of the timer whenever the
    // window is resized. We reuse the global timer variable.
    timer.style.fontSize = timer.offsetWidth / 2 + "px";
};

refresh_page = function () {
	var input = document.getElementById('urlInput').value;
	if (!input) {
		input = 5;
	}
    window.location.href = window.location.origin + '/?' + input;
};