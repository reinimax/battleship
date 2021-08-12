const Player = (playerGameboard, enemyGameboard, isHuman = true) => {
  let active = false;
  /** This object is used by the computer player to save information about a ship
   * that was successfully hit, enabling it, to make smarter guesses */
  let successfullyHit = {};

  /** This array will hold the coordinates that the computer player excludes,
   * e. g. neighbors of a field that contains a ship, since on such a field now ship
   * could be placed according to the rules */
  const excluded = [];

  /** This array tracks the lengths of the remaining enemy ships. It is used to
   * make the AI smarter by checking if the randomly chosen coordinate has enough
   * free fields to contain a ship */
  const enemyShipLengths = [2, 3, 3, 4, 5];

  function target(coords) {
    return enemyGameboard.receiveAttack(coords);
  }

  /** Returns true if the coordinate is part of the excluded array */
  function isExcluded(coords) {
    return excluded.some(
      coord => coord[0] == coords[0] && coord[1] == coords[1]
    );
  }

  /** Returns true if the largest remaining ship may be placed on this
   * coordinate (that means, there are enough fields in at least one direction,
   * which have not been hit or excluded) */
  function isPossiblePosition(coords) {
    const longestShipLength = Math.max(...enemyShipLengths);
    /** counters start at 1, because the targeted field itself must be counted too
     * (otherwise the function would check for 1 field more then the greatest ship length!) */
    let counterHorizontal = 1;
    let counterVertical = 1;
    // check how many fields are valid to the left.
    for (let i = 1; i <= longestShipLength; i++) {
      if (
        enemyGameboard.isValidTarget([coords[0] - i, coords[1]]) &&
        !isExcluded([coords[0] - i, coords[1]])
      ) {
        counterHorizontal++;
      } else {
        break;
      }
    }
    // if >= longestShipLength, return true
    if (counterHorizontal >= longestShipLength) return true;

    // check how many fields are valid to the right.
    for (let i = 1; i <= longestShipLength; i++) {
      if (
        enemyGameboard.isValidTarget([coords[0] + i, coords[1]]) &&
        !isExcluded([coords[0] + i, coords[1]])
      ) {
        counterHorizontal++;
      } else {
        break;
      }
    }
    // if free fields to the left + fields to the right >= longestShipLength, return true
    if (counterHorizontal >= longestShipLength) return true;

    // check how many fields are valid above.
    for (let i = 1; i <= longestShipLength; i++) {
      if (
        enemyGameboard.isValidTarget([coords[0], coords[1] - i]) &&
        !isExcluded([coords[0], coords[1] - i])
      ) {
        counterVertical++;
      } else {
        break;
      }
    }
    // if >= longestShipLength, return true
    if (counterVertical >= longestShipLength) return true;

    // check how many fields are valid below
    for (let i = 1; i <= longestShipLength; i++) {
      if (
        enemyGameboard.isValidTarget([coords[0], coords[1] + i]) &&
        !isExcluded([coords[0], coords[1] + i])
      ) {
        counterVertical++;
      } else {
        break;
      }
    }
    // if free fields above + below >= longestShipLength, return true
    if (counterVertical >= longestShipLength) return true;
    return false;
  }

  /** Helper that pushes coords into the excluded array. First the coords are checked if they are valid coordinates */
  function exclude(obj) {
    let coordsX = obj.coordsX;
    let coordsY = obj.coordsY;
    // if the ship is horizontal
    if (coordsX.length > 1) {
      // push above and below
      coordsX.forEach(x => {
        let above = coordsY[0] - 1;
        let below = coordsY[0] + 1;
        if (above <= 10 && above > 0) excluded.push([x, above]);
        if (below <= 10 && below > 0) excluded.push([x, below]);
      });
      // push the sides, including diagonal fields
      let start = Math.min(...coordsX) - 1;
      let end = Math.max(...coordsX) + 1;
      if (
        coordsY[0] - 1 <= 10 &&
        coordsY[0] - 1 > 0 &&
        start <= 10 &&
        start > 0
      )
        excluded.push([start, coordsY[0] - 1]);
      if (
        coordsY[0] + 1 <= 10 &&
        coordsY[0] + 1 > 0 &&
        start <= 10 &&
        start > 0
      )
        excluded.push([start, coordsY[0] + 1]);
      if (coordsY[0] <= 10 && coordsY[0] > 0 && start <= 10 && start > 0)
        excluded.push([start, coordsY[0]]);
      if (coordsY[0] - 1 <= 10 && coordsY[0] - 1 > 0 && end <= 10 && end > 0)
        excluded.push([end, coordsY[0] - 1]);
      if (coordsY[0] + 1 <= 10 && coordsY[0] + 1 > 0 && end <= 10 && end > 0)
        excluded.push([end, coordsY[0] + 1]);
      if (coordsY[0] <= 10 && coordsY[0] > 0 && end <= 10 && end > 0)
        excluded.push([end, coordsY[0]]);
    }
    // if the ship is vertical
    else if (coordsY.length > 1) {
      // push above and below
      coordsY.forEach(y => {
        let left = coordsX[0] - 1;
        let right = coordsX[0] + 1;
        if (left <= 10 && left > 0) excluded.push([left, y]);
        if (right <= 10 && right > 0) excluded.push([right, y]);
      });
      // push the sides, including diagonal fields
      let start = Math.min(...coordsY) - 1;
      let end = Math.max(...coordsY) + 1;
      if (
        coordsX[0] - 1 <= 10 &&
        coordsX[0] - 1 > 0 &&
        start <= 10 &&
        start > 0
      )
        excluded.push([coordsX[0] - 1, start]);
      if (
        coordsX[0] + 1 <= 10 &&
        coordsX[0] + 1 > 0 &&
        start <= 10 &&
        start > 0
      )
        excluded.push([coordsX[0] + 1, start]);
      if (coordsX[0] <= 10 && coordsX[0] > 0 && start <= 10 && start > 0)
        excluded.push([coordsX[0], start]);
      if (coordsX[0] - 1 <= 10 && coordsX[0] - 1 > 0 && end <= 10 && end > 0)
        excluded.push([coordsX[0] - 1, end]);
      if (coordsX[0] + 1 <= 10 && coordsX[0] + 1 > 0 && end <= 10 && end > 0)
        excluded.push([coordsX[0] + 1, end]);
      if (coordsX[0] <= 10 && coordsX[0] > 0 && end <= 10 && end > 0)
        excluded.push([coordsX[0], end]);
    }
  }

  function attack() {
    if (!isHuman) {
      let x, y;
      let result;
      if ('coordsX' in successfullyHit) {
        x = Math.min(successfullyHit.coordsX);
        y = Math.min(successfullyHit.coordsY);
        let left = Math.min(...successfullyHit.coordsX) - 1;
        let right = Math.max(...successfullyHit.coordsX) + 1;
        let above = Math.min(...successfullyHit.coordsY) - 1;
        let below = Math.max(...successfullyHit.coordsY) + 1;
        // try left first: if we already hit left before, it will be no valid target and the condition is skipped anyway
        if (enemyGameboard.isValidTarget([left, y]) && !isExcluded([left, y])) {
          result = target([left, y]);
          if (result.length > 0) {
            successfullyHit.coordsX.push(left);
          }
        } else if (
          enemyGameboard.isValidTarget([right, y]) &&
          !isExcluded([right, y])
        ) {
          result = target([right, y]);
          if (result.length > 0) {
            successfullyHit.coordsX.push(right);
          }
        } else if (
          enemyGameboard.isValidTarget([x, above]) &&
          !isExcluded([x, above])
        ) {
          result = target([x, above]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(above);
          }
        } else if (
          enemyGameboard.isValidTarget([x, below]) &&
          !isExcluded([x, below])
        ) {
          result = target([x, below]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(below);
          }
        }
        // now, check if the ship was sunk. if so, reset successfullyHit
        if (result.sunk === true) {
          exclude(successfullyHit);
          // remove length of the sunk ship
          enemyShipLengths.splice(enemyShipLengths.indexOf(result.length), 1);
          successfullyHit = {};
        }
      } else {
        // if no hit was scored previously, choose random
        do {
          x = Math.floor(Math.random() * 10 + 1);
          y = Math.floor(Math.random() * 10 + 1);
        } while (
          !enemyGameboard.isValidTarget([x, y]) ||
          isExcluded([x, y]) ||
          !isPossiblePosition([x, y])
        );
        result = target([x, y]);
        if (result.length > 0) {
          successfullyHit.coordsX = [x];
          successfullyHit.coordsY = [y];
        }
      }
      return result;
    }
  }

  return { isHuman, active, target, attack, isPossiblePosition, excluded };
};

module.exports = Player;
