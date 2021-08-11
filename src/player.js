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

  /** Returns true if the coordinate is part of the exluded array */
  function isExcluded(coords) {
    let result = excluded.some(
      coord => coord[0] == coords[0] && coord[1] == coords[1]
    );
    console.log(result);
    return result;
  }

  /** Helper that pushes coords into the excluded array. First the coords are checked if they are valid coordinates */
  function exclude(coords) {
    if (coords[0] <= 10 && coords[0] > 0 && coords[1] <= 10 && coords[1] > 0) {
      excluded.push(coords);
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
            // diagonal coords
            exclude([left - 1, y - 1]);
            exclude([left - 1, y + 1]);
            exclude([left + 1, y - 1]);
            exclude([left + 1, y + 1]);
            // coords above and below
            exclude([left, y - 1]);
            exclude([left, y + 1]);
          }
        } else if (
          enemyGameboard.isValidTarget([right, y]) &&
          !isExcluded([right, y])
        ) {
          result = target([right, y]);
          if (result.length > 0) {
            successfullyHit.coordsX.push(right);
            // diagonal coords
            exclude([right - 1, y - 1]);
            exclude([right - 1, y + 1]);
            exclude([right + 1, y - 1]);
            exclude([right + 1, y + 1]);
            // coords above and below
            exclude([right, y - 1]);
            exclude([right, y + 1]);
          }
        } else if (
          enemyGameboard.isValidTarget([x, above]) &&
          !isExcluded([x, above])
        ) {
          result = target([x, above]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(above);
            // diagonal coords
            exclude([x - 1, above - 1]);
            exclude([x - 1, above + 1]);
            exclude([x + 1, above - 1]);
            exclude([x + 1, above + 1]);
            // coords above and below
            exclude([x - 1, above]);
            exclude([x + 1, above]);
          }
        } else if (
          enemyGameboard.isValidTarget([x, below]) &&
          !isExcluded([x, below])
        ) {
          result = target([x, below]);
          if (result.length > 0) {
            successfullyHit.coordsY.push(below);
            // diagonal coords
            exclude([x - 1, below - 1]);
            exclude([x - 1, below + 1]);
            exclude([x + 1, below - 1]);
            exclude([x + 1, below + 1]);
            // coords above and below
            exclude([x - 1, below]);
            exclude([x + 1, below]);
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
        } while (!enemyGameboard.isValidTarget([x, y]) || isExcluded([x, y]));
        result = target([x, y]);
        if (result.length > 0) {
          successfullyHit.coordsX = [x];
          successfullyHit.coordsY = [y];
          // exclude diagonal fields
          exclude([x - 1, y - 1]);
          exclude([x - 1, y + 1]);
          exclude([x + 1, y - 1]);
          exclude([x + 1, y + 1]);
        }
      }
      console.log(excluded);
      return result;
    }
  }

  return { isHuman, active, target, attack };
};

module.exports = Player;
