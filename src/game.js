const GameBoard = require('./gameboard');
const Player = require('./player');
const View = require('./view');

// game loop
// create players and boards
const boardPlayer1 = GameBoard();
boardPlayer1.populateRandomly();
const boardPlayer2 = GameBoard();
boardPlayer2.populateRandomly();
const player1 = Player(boardPlayer1, boardPlayer2);
const player2 = Player(boardPlayer2, boardPlayer1, false);

// creating the boards in the dom
const view = View();
view.renderBoard(boardPlayer1, '.player1Board');
view.renderBoard(boardPlayer2, '.player2Board', false);

// simple solution: onclick in the dom module:
// (set player1 inactive)
// handle the attack
// let player2 make a move
// set player1 active
