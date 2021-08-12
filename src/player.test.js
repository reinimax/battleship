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

describe('possible guesses for the AI', () => {
  test('field in the middle of the board is possible', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    expect(ai.isPossiblePosition([5, 5])).toEqual(true);
  });

  test('field is possible when there is space to the left', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([8, 1]);
    ai.target([7, 2]);
    expect(ai.isPossiblePosition([7, 1])).toEqual(true);
  });

  test('field is possible when there is space to the right', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([1, 2]);
    expect(ai.isPossiblePosition([1, 1])).toEqual(true);
  });

  test('field is possible when there is space above', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([9, 10]);
    expect(ai.isPossiblePosition([10, 10])).toEqual(true);
  });

  test('field is possible when there is space below', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([9, 1]);
    expect(ai.isPossiblePosition([10, 1])).toEqual(true);
  });

  test('field is possible when there is space horizontally', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([6, 1]);
    ai.target([3, 2]);
    expect(ai.isPossiblePosition([3, 1])).toEqual(true);
  });

  test('field is possible when there is space vertically', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([1, 6]);
    ai.target([2, 3]);
    expect(ai.isPossiblePosition([1, 3])).toEqual(true);
  });

  test('correctly returns false when the field is not possible, vertically', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([1, 5]);
    ai.target([2, 3]);
    expect(ai.isPossiblePosition([1, 3])).toEqual(false);
  });

  test('correctly returns false when the field is not possible, horizontally', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.target([7, 8]);
    ai.target([8, 6]);
    expect(ai.isPossiblePosition([8, 8])).toEqual(false);
  });

  test('respects excluded coordinates', () => {
    const gameBoard1 = GameBoard();
    const gameBoard2 = GameBoard();
    const ai = Player(gameBoard1, gameBoard2);
    ai.excluded.push([2, 2]);
    ai.excluded.push([2, 7]);
    ai.excluded.push([5, 5]);
    expect(ai.isPossiblePosition([2, 5])).toEqual(false);
  });
});
