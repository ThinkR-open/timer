document.addEventListener("DOMContentLoaded", function() {
    let timer = document.querySelector("#timer");
    timer.style.fontSize = timer.offsetWidth / 2 + "px";
    const minq = window.location.search.split("?")[1]
    if (minq) {
        document.querySelector("#minutes").innerHTML = minq;
    } else {
        document.querySelector("#minutes").innerHTML = "5";
    }

    document.querySelector("#seconds").innerHTML = "00";

    function tick() {
        let sec = document.querySelector("#seconds");
        let secnum = parseInt(sec.innerHTML)
        if (secnum === 0) {
            let min = document.querySelector("#minutes");
            let minnum = parseInt(min.innerHTML);
            if (minnum === 0) {
                clearInterval(ticker_interv)
            } else {
                sec.innerText = 59
                min.innerHTML = minnum - 1
            }
        } else {
            let minone = secnum - 1;
            minone = minone.toString();
            if (minone.length === 1) {
                minone = "0" + minone
            }
            sec.innerText = minone
        }
    }

    let ticker_interv = setInterval(tick, 1000);

    window.onresize = function() {
        let timer = document.querySelector("#timer");
        timer.style.fontSize = timer.offsetWidth / 2 + "px";
    };

});