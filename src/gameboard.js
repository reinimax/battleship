const Ship = require('./ship');

const GameBoard = () => {
  let ships = [];
  let minCoords = 1;
  let maxCoords = 10;
  let board = [];
  for (let x = minCoords; x <= maxCoords; x++) {
    for (let y = minCoords; y <= maxCoords; y++) {
      board.push({
        x: x,
        y: y,
        hasShip: false,
        isHit: false
      });
    }
  }

  function placeShip(coords) {
    // check for placing ships on top of each other
    let conflict = [];
    coords.forEach(coordPair => {
      // skip execution if we already found a conflict
      if (conflict.length <= 0) {
        conflict = board.filter(field => {
          return (
            field.x === coordPair[0] &&
            field.y === coordPair[1] &&
            field.hasShip === true
          );
        });
      }
    });
    if (conflict.length > 0) return false;
    // check for placing ships outside the board
    if (
      coords[0][0] < minCoords ||
      coords[0][0] > maxCoords ||
      coords[0][1] < minCoords ||
      coords[0][1] > maxCoords ||
      coords[1][0] < minCoords ||
      coords[1][0] > maxCoords ||
      coords[1][1] < minCoords ||
      coords[1][1] > maxCoords
    ) {
      return false;
    }
    ships.push(Ship(coords));
    // place the coords on the board
    coords.forEach(coordPair => {
      board.map(field => {
        if (field.x === coordPair[0] && field.y === coordPair[1]) {
          field.hasShip = true;
        }
      });
    });
  }

  function getBoard() {
    return board;
  }

  function receiveAttack(coords) {
    board.map(field => {
      if (field.x === coords[0] && field.y === coords[1]) {
        field.isHit = true;
        // if there is a ship on this field, invoke it's hit function
        if (field.hasShip) {
          // we loop over all the ships, which is fine since it will hit only one with these coords.
          // still, it would be nice to be able to reference a specific ship on the board.
          ships.forEach(ship => ship.hit(coords));
        }
      }
    });
  }

  return { ships, placeShip, getBoard, receiveAttack };
};

module.exports = GameBoard;
