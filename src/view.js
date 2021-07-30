const View = () => {
  function renderBoard(gameBoard, selector, isPlayerBoard = true) {
    // todo: make sure we clear the board first before populating it again
    const board = document.querySelector(selector);
    gameBoard.getBoard().forEach(obj => {
      const div = document.createElement('div');
      div.setAttribute('data-x', obj.x);
      div.setAttribute('data-y', obj.y);
      // set classes for displaying ships only if it is the player board
      if (isPlayerBoard) {
        if (obj.hasShip) div.classList.add('hasShip');
      }
      if (obj.isHit) div.classList.add('isHit');

      board.appendChild(div);
    });
  }

  return { renderBoard };
};

module.exports = View;
