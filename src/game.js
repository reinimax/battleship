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

// set player1 active
player1.active = true;

// add eventlistener for click on enemy board
document.querySelector('.player2Board').addEventListener('click', e => {
  const x = e.target.dataset.x;
  const y = e.target.dataset.y;
  // only execute if the player didn't already click on this field
  if (boardPlayer2.isValidTarget([x, y])) {
    let player1Result = boardPlayer2.receiveAttack([x, y]);
    if (player1Result.sunk === true) console.log('enemy ship sunk!');
    if (player1Result.remaining == 0) console.log('congratz, you won');
    // render gameboard again
    view.renderBoard(boardPlayer2, '.player2Board', false);
    // set player2 active and handle his attack
    let player2Result = player2.attack();
    view.renderBoard(boardPlayer1, '.player1Board');
    if (player2Result.remaining == 0) console.log('player 2 won');
  }
});
