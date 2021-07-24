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
});

describe('the gamebaord itself', () => {
  test('is a 10x10 grid', () => {
    expect(GameBoard().getBoard().length).toBe(100);
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
});

// tbd
test('does not allow attacking a field outside the board', () => {});
test('there must be one field between ships', () => {});
test('ships cannot touch diagonally', () => {});
test('gameboard distinguishes between hit and miss', () => {});
test('gameboard reports when a ship is sunk', () => {});
test('gameboard reports when all ships are sunk', () => {});
