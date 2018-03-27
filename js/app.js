$(function() {

    //array that holds the values for the memory cards
    const memoryBoard = $('#memory-game');

    const cardArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];


    createBoard();








    function createBoard() {
            for (i = 1; i <= cardArray.length; i++) {
            memoryBoard.append($(`<div class='card' data-card-type='${cardArray[i-1]}'><div class='front'></div><div class='back'> ${cardArray[i-1]} </div></div>'`));
            }
    };



});
