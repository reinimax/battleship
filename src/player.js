const Player = (playerGameboard, enemyGameboard, isHuman = true) => {
  let active = false;

  function target(coords) {
    return enemyGameboard.receiveAttack(coords);
  }

  function attack() {
    if (!isHuman) {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10 + 1);
        y = Math.floor(Math.random() * 10 + 1);
      } while (!enemyGameboard.isValidTarget([x, y]));
      const result = target([x, y]);
      return result;
    }
  }

  return { isHuman, active, target, attack };
};

module.exports = Player;
