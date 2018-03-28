//Stopwatch function, based on https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/

function stopwatch() {

    let seconds = 00;
    let tens = 00;
    let minutes = 00;
    let appendTens = $("#tens");
    let appendSeconds = $("#seconds");
    let appendMinutes = $("#minutes");

    let Interval;

    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);

    function startTimer() {
        tens++;

        if (tens < 9) {
            appendTens.html("0" + tens);
        }

        if (tens > 9) {
            appendTens.html(tens);

        }

        if (tens > 99) {
            seconds++;
            appendSeconds.html("0" + seconds);
            tens = 0;
            appendTens.html("0" + 0);
        }

        if (seconds > 9) {
            appendSeconds.html(seconds);
        }

        if (seconds > 59) {
            minutes++;
            appendMinutes.html("0" + minutes);
            seconds = 0;
            appendSeconds.html("0" + 0);
        }

    }


};
