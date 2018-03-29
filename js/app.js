$(function () {

    //DECLARATION OF VARIABLES
    const memoryBoard = $('#memory-game');

    //array that holds the values for the memory cards
    let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let comparisonArray = [];

    //
    let attempts = 0; //counts how many attempts a player has made
    let clickCount = 0; //counts if this is the first click in an attempt
    let pairs = 0; //counts how many pairs have already been discovered
    let cardID = ''; //stores the card ID of solved pairs


    let seconds = 00;
    let tens = 00;
    let minutes = 00;
    let appendTens = $("#tens");
    let appendSeconds = $("#seconds");
    let appendMinutes = $("#minutes");
    let Interval;


    //on page load
    createBoard();






    //EVENT TRIGGERS
    $('.card').click(function (event) {

        //if this is the initial click, start the stopwatch

        if (attempts === 0) {
            startWatch();
        };


        //flip the card if it isn't already open or the comparison array full

        if ($(this).hasClass("flipped") || $(this).hasClass("solved") || comparisonArray.length >= 2) {

            return;

        } else {

            flipCard($(event.target).parent());
        };

        //open the card and store the card information in an array

        comparisonArray.push($(this).data("card-type"));

        //if this is the first card clicked simply count the click and number of attempts

        if (clickCount === 0) {

            clickCount++;
            recordAttempts();

        } else {

            //if this is the second card clicked compare whether it is the same as the other stored card. If yes, add to the number of pairs and change the css attribute to permanently leave the card open.

            if (comparisonArray[0] === comparisonArray[1]) {


                $("[data-card-type=" + comparisonArray[0] + "]").removeClass('flipped').addClass('solved');

                pairs++;

                if(pairs===8) {
                    gameOver();
                }
            };

            //close all unsuccessfully opened cards and clear the comparison array with a short delay

            setTimeout(function () {
                flipCard($('.flipped'));
                comparisonArray = [];

            }, 1000);

            //reset the click count

            clickCount = 0;

        }

    });


    $('.fa-undo').click(function () {
        location.reload();
    });


    //FUNCTIONS

    //function to flip cards
    function flipCard(element) {
        $(element).toggleClass('flipped');

    }

    //function to record the number of attempts of a player and to reduce the number of stars based on performance
    function recordAttempts() {
        attempts++;
        $('#attempts').html(attempts);

        if (attempts > 16 && attempts < 24) {
            $('#stars').html('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>');
        } else if (attempts >= 24 && attempts < 32) {
            $('#stars').html('<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>');
        } else if (attempts >= 32) {
            $('#stars').html('<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>');
        } else {
            return;
        };

    }

    //function to create the memory board
    function createBoard() {

        cardArray = shuffle(cardArray);

        for (i = 1; i <= cardArray.length; i++) {
            memoryBoard.append($(`<div class='container'><div class='card' data-card-type='${cardArray[i-1]}'><figure class='front'></figure><figure class='back'></figure></div></div>'`));
        }
    };


    //function for what happens when all pairs are found and the game is over
    function gameOver() {
        stopWatch();
        messageWinning();

    }

    //function for the popup message on winning
    function messageWinning() {


        $(`<section class="game-over"><div class="message-box"><h2>Yay! You have found all pairs!</h2><p>Number of attempts: ${attempts}</p><p>Time required: 00:00 </p><p>Level: stars</p><p><i class="fas fa-undo"></i></p></div></section>`).insertAfter($('.game'));

        $('.message-box').fadeIn(800);

    }


    // shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    //Stopwatch function, based on https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/

    function stopWatch() {
        clearInterval(Interval);
    }

    function startWatch() {

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


    }




});
