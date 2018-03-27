$(function() {

    //DECLARATION OF VARIABLES
    const memoryBoard = $('#memory-game');

    //array that holds the values for the memory cards
    let cardArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];


    //on page load
    createBoard();



    //EVENT TRIGGERS
    $( '.card' ).click(function(event) {
        flipCard(event.target);
    });



    //FUNCTIONS

    //function to flip cards
    function flipCard(element) {
        $(element).parent().toggleClass('flipped');

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
        var currentIndex = array.length, temporaryValue, randomIndex;

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
