const GameBoard = require('./gameboard');
const Ship = require('./ship');

describe('placing ships on the board', () => {
  test('can place a single ship', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expected = Ship([
      [1, 1],
      [2, 1]
    ]);
    // workaround: JSON.parse(JSON.stringify(result.current))).toEqual(expected)
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify([expected]))
    );
  });

  test('can place a longer single ship', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [4, 1]
    ]);
    actual = board.getBoard().filter(field => field.hasShip === true);
    expected = [
      {
        x: 1,
        y: 1,
        hasShip: true,
        isHit: false
      },
      {
        x: 2,
        y: 1,
        hasShip: true,
        isHit: false
      },
      {
        x: 3,
        y: 1,
        hasShip: true,
        isHit: false
      },
      {
        x: 4,
        y: 1,
        hasShip: true,
        isHit: false
      }
    ];
    expect(JSON.parse(JSON.stringify(actual))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('can place a single ship vertically', () => {
    let board = GameBoard();
    board.placeShip([
      [4, 6],
      [4, 8]
    ]);
    expected = Ship([
      [4, 6],
      [4, 8]
    ]);
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify([expected]))
    );
  });

  test('cannot place ships outside the gameboard', () => {
    let board = GameBoard();
    board.placeShip([
      [10, 10],
      [11, 10]
    ]);
    expected = [];
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('cannot place ships outside the gameboard, vertically', () => {
    let board = GameBoard();
    board.placeShip([
      [10, 10],
      [10, 11]
    ]);
    expected = [];
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('can place multiple ships', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    board.placeShip([
      [3, 3],
      [3, 7]
    ]);
    let expected = [
      Ship([
        [1, 1],
        [2, 1]
      ]),
      Ship([
        [3, 3],
        [3, 7]
      ])
    ];
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('cannot place ships on top of each other', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    board.placeShip([
      [2, 1],
      [2, 2]
    ]);
    expected = [
      Ship([
        [1, 1],
        [2, 1]
      ])
    ];
    expect(JSON.parse(JSON.stringify(board.ships))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('cannot place longer ships on top of each other', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 2],
      [4, 2]
    ]);
    expected = board.placeShip([
      [2, 1],
      [2, 3]
    ]);
    expect(expected).toEqual(false);
  });

  test('there must be one field between ships, below', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    let expected = board.placeShip([
      [1, 2],
      [2, 2]
    ]);
    expect(expected).toEqual(false);
  });

  test('there must be one field between ships, above', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [2, 2],
      [3, 2]
    ]);
    expect(expected).toEqual(false);
  });

  test('there must be one field between ships, left', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [1, 3],
      [2, 3]
    ]);
    expect(expected).toEqual(false);
  });

  test('there must be one field between ships, right', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [5, 3],
      [5, 4]
    ]);
    expect(expected).toEqual(false);
  });

  test('ships cannot touch diagonally, right and below', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    let expected = board.placeShip([
      [3, 2],
      [3, 3]
    ]);
    expect(expected).toEqual(false);
  });

  test('ships cannot touch diagonally, left and below', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [2, 4],
      [2, 5]
    ]);
    expect(expected).toEqual(false);
  });

  test('ships cannot touch diagonally, left and above', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [2, 1],
      [2, 2]
    ]);
    expect(expected).toEqual(false);
  });

  test('ships cannot touch diagonally, right and above', () => {
    let board = GameBoard();
    board.placeShip([
      [3, 3],
      [4, 3]
    ]);
    let expected = board.placeShip([
      [5, 1],
      [5, 2]
    ]);
    expect(expected).toEqual(false);
  });
});

describe('the gamebaord itself', () => {
  test('is a 10x10 grid', () => {
    expect(GameBoard().getBoard().length).toBe(100);
  });

  test('can populate the gameboard randomly', () => {
    let board = GameBoard();
    board.populateRandomly();
    expect(board.ships.length).toBe(5);
  });
});

describe('handling attacks', () => {
  test('hits a ship correctly', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expected = { x: 1, y: 1, hit: true };
    board.receiveAttack([1, 1]);
    expect(JSON.parse(JSON.stringify(board.ships[0].position[0]))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('tracks a hit correctly on the board', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expected = { x: 1, y: 1, hasShip: true, isHit: true };
    board.receiveAttack([1, 1]);
    expect(JSON.parse(JSON.stringify(board.getBoard()[0]))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('tracks a miss correctly on the board', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expected = { x: 1, y: 2, hasShip: false, isHit: true };
    board.receiveAttack([1, 2]);
    expect(JSON.parse(JSON.stringify(board.getBoard()[1]))).toEqual(
      JSON.parse(JSON.stringify(expected))
    );
  });

  test('gameboard reports when a ship is sunk', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    board.placeShip([
      [6, 4],
      [6, 5]
    ]);
    board.receiveAttack([1, 1]);
    expected = { sunk: true, length: 2, remaining: 1 };
    expect(board.receiveAttack([2, 1])).toEqual(expected);
  });

  test('gameboard reports not always that a ship is sunk', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expected = { sunk: false, length: 2, remaining: 1 };
    expect(board.receiveAttack([1, 1])).toEqual(expected);
  });

  test('gameboard distinguishes between hit and miss', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    expect(board.receiveAttack([3, 1])).toEqual(false);
  });

  test('gameboard reports when all ships are sunk', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    board.receiveAttack([1, 1]);
    expected = { sunk: true, length: 2, remaining: 0 };
    expect(board.receiveAttack([2, 1])).toEqual(expected);
  });

  test('reporting when all ships are sunk works with multiple ships', () => {
    let board = GameBoard();
    board.placeShip([
      [1, 1],
      [2, 1]
    ]);
    board.placeShip([
      [6, 4],
      [6, 7]
    ]);
    board.receiveAttack([1, 1]);
    board.receiveAttack([2, 1]);
    board.receiveAttack([6, 4]);
    board.receiveAttack([6, 5]);
    board.receiveAttack([6, 6]);
    expected = { sunk: true, length: 4, remaining: 0 };
    expect(board.receiveAttack([6, 7])).toEqual(expected);
  });

  test('field that was targeted the first time is a valid target', () => {
    expect(GameBoard().isValidTarget([6, 7])).toEqual(true);
  });

  test('field that was targeted already is an invalid target', () => {
    let board = GameBoard();
    board.receiveAttack([6, 6]);
    expect(board.isValidTarget([6, 6])).toEqual(false);
  });
});
