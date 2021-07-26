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
    const ship = Ship(coords);
    // check for placing ships on top of each other
    let conflict = [];
    ship.position.forEach(pos => {
      // skip execution if we already found a conflict
      if (conflict.length <= 0) {
        conflict = board.filter(field => {
          return (
            // check the field itself
            (field.x === pos.x &&
              field.y === pos.y &&
              field.hasShip === true) ||
            // check the field to the right
            (field.x === pos.x + 1 &&
              field.y === pos.y &&
              field.hasShip === true) ||
            // check the field to the left
            (field.x === pos.x - 1 &&
              field.y === pos.y &&
              field.hasShip === true) ||
            // check the field below
            (field.x === pos.x &&
              field.y === pos.y + 1 &&
              field.hasShip === true) ||
            // check the field above
            (field.x === pos.x &&
              field.y === pos.y - 1 &&
              field.hasShip === true) ||
            // check the fields diagonally:
            // right + below
            (field.x === pos.x + 1 &&
              field.y === pos.y + 1 &&
              field.hasShip === true) ||
            // right + above
            (field.x === pos.x + 1 &&
              field.y === pos.y - 1 &&
              field.hasShip === true) ||
            // left + above
            (field.x === pos.x - 1 &&
              field.y === pos.y - 1 &&
              field.hasShip === true) ||
            // left + below
            (field.x === pos.x - 1 &&
              field.y === pos.y + 1 &&
              field.hasShip === true)
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
    // place the coords on the board
    ship.position.forEach(pos => {
      board.map(field => {
        if (field.x === pos.x && field.y === pos.y) {
          field.hasShip = true;
        }
      });
    });
    ships.push(ship);
    return true;
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
