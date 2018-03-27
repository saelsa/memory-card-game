$(function() {

    //array that holds the values for the memory cards
    const memoryBoard = $('#memory-game');

    let cardArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];



    createBoard();







    function createBoard() {

            cardArray = shuffle(cardArray);

            for (i = 1; i <= cardArray.length; i++) {
            memoryBoard.append($(`<div class='card' data-card-type='${cardArray[i-1]}'><div class='front'></div><div class='back'> ${cardArray[i-1]} </div></div>'`));
            }
    };


    // Shuffle function from http://stackoverflow.com/a/2450976
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
