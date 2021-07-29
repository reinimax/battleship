const Ship = require('./ship');

const GameBoard = () => {
  let ships = [];
  let shipTypes = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Destroyer', length: 3 },
    { type: 'Submarine', length: 3 },
    { type: 'Patrol Boat', length: 2 }
  ];
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

  function populateRandomly() {
    shipTypes.forEach(ship => {
      let success;
      do {
        // create two random numbers between 1 and 10. This will be our starting coordinate
        let randStartX = Math.floor(Math.random() * 10) + 1;
        let randStartY = Math.floor(Math.random() * 10) + 1;
        let randStartCoord = [randStartX, randStartY];
        // create another arbitrary number to choose between vertical and horizontal placement
        // create our end coordinate: x or y will be the same, depending if vertically or horizontally arranged
        // create the other coordinate by adding ship.length - 1 and the x or y coordinate
        // check if the calculated number is greater than 10: if so, instead subtract ship.length + 1
        let randEndCoord = [];
        if (Math.random() < 0.5) {
          // horizontal
          let randEndX = randStartX + ship.length - 1;
          if (randEndX > 10) randEndX = randStartX - ship.length + 1;
          randEndCoord.push(randEndX);
          randEndCoord.push(randStartY);
        } else {
          // vertical
          let randEndY = randStartY + ship.length - 1;
          if (randEndY > 10) randEndY = randStartY - ship.length + 1;
          randEndCoord.push(randStartX);
          randEndCoord.push(randEndY);
        }
        // place the ship
        let finalCoords = [randStartCoord, randEndCoord];
        success = placeShip(finalCoords);
        // we need to try placing the ship until a valid position is found
      } while (success !== true);
    });
  }

  function receiveAttack(coords) {
    let hitInfo = {};
    board.map(field => {
      if (field.x === coords[0] && field.y === coords[1]) {
        field.isHit = true;
        // if there is a ship on this field, invoke it's hit function
        if (field.hasShip) {
          // get the ship that was hit by filtering the ships array for a ship that contains the coordinates in its position array
          ship = ships.filter(ship => {
            return ship.position.some(pos => {
              return pos.x === coords[0] && pos.y === coords[1];
            });
          })[0];
          ship.hit(coords);
          hitInfo.sunk = ship.sunk;
          hitInfo.length = ship.length;
          hitInfo.remaining = ships.filter(ship => ship.sunk === false).length;
        }
      }
    });
    if (hitInfo.length > 0) return hitInfo;
    return false;
  }

  return { ships, placeShip, getBoard, receiveAttack, populateRandomly };
};

module.exports = GameBoard;
