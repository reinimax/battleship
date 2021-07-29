const Player = (playerGameboard, enemyGameboard, isHuman = true) => {
  let active = false;

  function target(coords) {
    enemyGameboard.receiveAttack(coords);
  }

  return { isHuman, active, target };
};

module.exports = Player;
