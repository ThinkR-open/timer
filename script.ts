// We query the timer object. We want it to be of type 
// HTMLHeadingElement so that it can only 
// receive a heading element. 
// Other type could have been HTMLElement, an interface for all html elements
// but it's a larger type.
let timer: HTMLHeadingElement = document.querySelector("#timer") as HTMLHeadingElement;

// This wil set the size of the timer
timer.style.fontSize = timer.offsetWidth / 2 + "px";

// We'll search for the query params in the url
let loc: Location = window.location;
let minutes: string = loc.search.split("?")[1];
let doc: HTMLSpanElement = document.querySelector("#minutes") as HTMLSpanElement;

// If there is a minute query param, we'll set the innerHTML
// of #minutes to that value.
// That means that we always start with NUMBER:00 as a default, 
// i.e the minutes values is always 0 at the start.
if (minutes) {
    doc.innerHTML = minutes;
} else {
    doc.innerHTML = "5";
}

let sec: HTMLSpanElement = document.querySelector("#seconds") as HTMLSpanElement;
sec.innerHTML = "00";

function getAsNumberFromQS(id: string): number {
    let sec: HTMLSpanElement = document.querySelector(id) as HTMLSpanElement;
    return parseInt(sec.innerHTML);
}

function updateByQS(id: string, value: string): void {
    let domEl: HTMLSpanElement = document.querySelector(id) as HTMLSpanElement;
    domEl.innerHTML = value;
}


function tick(): void {
    let secnum: number = getAsNumberFromQS("#seconds");
    if (secnum === 0) {
        let minnum: number = getAsNumberFromQS("#minutes");
        // If the minutes is 0, we'll stop the timer.
        // as it means that we have reached 00:00
        if (minnum === 0) {
            clearInterval(ticker_interv)
        } else {
            // Here, the seconds is 0, so we'll set it back to 
            //59 and decrement the minutes.
            updateByQS("#seconds", "59");
            updateByQS("#minutes", (minnum - 1).toString())
        }
    } else {
        // We're not at MIN:00, so we'll just decrement the seconds.
        let new_secnum: string = (secnum - 1).toString();
        if (new_secnum.length === 1) {
            new_secnum = "0" + new_secnum;
        }
        updateByQS("#seconds", new_secnum)
    }
}

let ticker_interv: number = setInterval(tick, 1000);

window.onresize = function () {
    // Reupdate the font size of the timer whenever the 
    // window is resized. We reuse the global timer variable.
    timer.style.fontSize = timer.offsetWidth / 2 + "px";
};