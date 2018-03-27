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



    //on page load
    createBoard();



    //EVENT TRIGGERS
    $('.card').click(function (event) {

        clearTimeout();
        //flip the card if it isn't already open or the comparison array full

        if ($(this).hasClass("flipped") || $(this).hasClass("solved") || comparisonArray.length >= 2) {

            return;

        } else {

            flipCard($(event.target).parent());
        };

        //open the card and store the card information in an array

        comparisonArray.push($(this).data("card-type"));

        //if this is the first card clicked simply count the click and attempt

        if (clickCount === 0) {

            clickCount++;
            attempts++;


        } else {

            //if this is the second card clicked store the card information in the array and compare whether is it the same as the other stored card. If yes add to the number of pairs and change the css attribute to permanently leave the card open.

            if (comparisonArray[0] === comparisonArray[1]) {

                pairs++;

                $("[data-card-type=" + comparisonArray[0] + "]").removeClass('flipped').addClass('solved');
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



    //FUNCTIONS

    //function to flip cards
    function flipCard(element) {
        $(element).toggleClass('flipped');

    }

    //function to create the memory board
    function createBoard() {

        cardArray = shuffle(cardArray);

        for (i = 1; i <= cardArray.length; i++) {
            memoryBoard.append($(`<div class='container'><div class='card' data-card-type='${cardArray[i-1]}'><figure class='front'></figure><figure class='back'> ${cardArray[i-1]} </figure></div></div>'`));
        }
    };


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
    };



});
