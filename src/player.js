const Player = (playerGameboard, enemyGameboard, isHuman = true) => {
  let active = false;
  /** This object is used by the computer player to save information about a ship
   * that was successfully hit, enabling it, to make smarter guesses */
  let successfullyHit = {};
  /** This array will hold the coordinates that the computer player excludes,
   * e. g. neighbors of a field that contains a ship, since on such a field now ship
   * could be placed according to the rules */
  const excluded = [];

  function target(coords) {
    return enemyGameboard.receiveAttack(coords);
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
        if (enemyGameboard.isValidTarget([left, y])) {
          result = target([left, y]);
          if (result.length > 0) {
            successfullyHit.coordsX.push(left);
          }
        } else if (enemyGameboard.isValidTarget([right, y])) {
          result = target([right, y]);
          if (result.length > 0) {
            successfullyHit.coordsX.push(right);
          }
        } else if (enemyGameboard.isValidTarget([x, above])) {
          result = target([x, above]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(above);
          }
        } else if (enemyGameboard.isValidTarget([x, below])) {
          result = target([x, below]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(below);
          }
        }
        // now, check if the ship was sunk. if so, reset successfullyHit
        if (result.sunk === true) {
          successfullyHit = {};
        }
      } else {
        // if no hit was scored previously, choose random
        do {
          x = Math.floor(Math.random() * 10 + 1);
          y = Math.floor(Math.random() * 10 + 1);
        } while (!enemyGameboard.isValidTarget([x, y]));
        result = target([x, y]);
        if (result.length > 0) {
          successfullyHit.coordsX = [x];
          successfullyHit.coordsY = [y];
        }
      }
      return result;
    }
  }

  return { isHuman, active, target, attack };
};

module.exports = Player;
