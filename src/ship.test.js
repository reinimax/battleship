const Ship = require('./ship');

test('returns the correct position with two fields', () => {
  expect(
    Ship([
      [1, 1],
      [2, 1]
    ]).position
  ).toStrictEqual([
    { x: 1, y: 1, hit: false },
    { x: 2, y: 1, hit: false }
  ]);
});

test('returns the correct position with three fields', () => {
  expect(
    Ship([
      [2, 3],
      [4, 3]
    ]).position
  ).toStrictEqual([
    { x: 2, y: 3, hit: false },
    { x: 3, y: 3, hit: false },
    { x: 4, y: 3, hit: false }
  ]);
});

test('returns the correct position vertically', () => {
  expect(
    Ship([
      [2, 3],
      [2, 5]
    ]).position
  ).toStrictEqual([
    { x: 2, y: 3, hit: false },
    { x: 2, y: 4, hit: false },
    { x: 2, y: 5, hit: false }
  ]);
});

test('works when the second pair of coordinates is less, horizontally', () => {
  expect(
    Ship([
      [2, 2],
      [1, 2]
    ]).position
  ).toStrictEqual([
    { x: 1, y: 2, hit: false },
    { x: 2, y: 2, hit: false }
  ]);
});

test('works when the second pair of coordinates is less, vertically', () => {
  expect(
    Ship([
      [2, 3],
      [2, 2]
    ]).position
  ).toStrictEqual([
    { x: 2, y: 2, hit: false },
    { x: 2, y: 3, hit: false }
  ]);
});

test('has the correct length vertically', () => {
  expect(
    Ship([
      [2, 3],
      [2, 2]
    ]).length
  ).toBe(2);
});

test('has the correct length horizontally', () => {
  expect(
    Ship([
      [2, 2],
      [4, 2]
    ]).length
  ).toBe(3);
});

test('hit function hits the ship', () => {
  let ship = Ship([
    [2, 2],
    [4, 2]
  ]);
  ship.hit([3, 2]);
  expect(ship.position).toStrictEqual([
    { x: 2, y: 2, hit: false },
    { x: 3, y: 2, hit: true },
    { x: 4, y: 2, hit: false }
  ]);
});

test('hit function does not always hit, x coordinate', () => {
  let ship = Ship([
    [2, 2],
    [4, 2]
  ]);
  ship.hit([5, 2]);
  expect(ship.position).toStrictEqual([
    { x: 2, y: 2, hit: false },
    { x: 3, y: 2, hit: false },
    { x: 4, y: 2, hit: false }
  ]);
});

test('hit function does not always hit, y coordinate', () => {
  let ship = Ship([
    [2, 2],
    [4, 2]
  ]);
  ship.hit([2, 3]);
  expect(ship.position).toStrictEqual([
    { x: 2, y: 2, hit: false },
    { x: 3, y: 2, hit: false },
    { x: 4, y: 2, hit: false }
  ]);
});

test('ship is sunk correctly', () => {
  let ship = Ship([
    [1, 2],
    [1, 3]
  ]);
  ship.hit([1, 2]);
  ship.hit([1, 3]);
  expect(ship.sunk).toBe(true);
});
