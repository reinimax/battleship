const Player = require('./player');
const GameBoard = require('./gameboard');

test('create a human player by default', () => {
  const gameBoard1 = GameBoard();
  const gameBoard2 = GameBoard();
  const player = Player(gameBoard1, gameBoard2);
  expect(player.isHuman).toBe(true);
});

test('create a computer player', () => {
  const gameBoard1 = GameBoard();
  const gameBoard2 = GameBoard();
  const player = Player(gameBoard1, gameBoard2, false);
  expect(player.isHuman).toBe(false);
});

test('player has an active property that is false by default', () => {
  const gameBoard1 = GameBoard();
  const gameBoard2 = GameBoard();
  const player = Player(gameBoard1, gameBoard2);
  expect(player.active).toBe(false);
});

test('player can target coordinates on the enemy board correctly', () => {
  const gameBoard1 = GameBoard();
  const gameBoard2 = GameBoard();
  gameBoard2.placeShip([
    [1, 1],
    [3, 1]
  ]);
  const player = Player(gameBoard1, gameBoard2);
  player.target([1, 1]);
  expected = { x: 1, y: 1, hasShip: true, isHit: true };
  expect(JSON.parse(JSON.stringify(gameBoard2.getBoard()[0]))).toEqual(
    JSON.parse(JSON.stringify(expected))
  );
});
