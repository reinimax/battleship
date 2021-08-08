const View = () => {
  function renderBoard(gameBoard, selector, isPlayerBoard = true) {
    const board = document.querySelector(selector);
    // make sure we clear the board first before populating it again
    clearBoard(board);
    gameBoard.getBoard().forEach(obj => {
      const div = document.createElement('div');
      div.setAttribute('data-x', obj.x);
      div.setAttribute('data-y', obj.y);
      // set classes for displaying ships only if it is the player board or already hit
      if (isPlayerBoard || obj.isHit) {
        if (obj.hasShip) div.classList.add('hasShip');
      }
      if (obj.isHit) div.classList.add('isHit');

      board.appendChild(div);
    });
  }

  function clearBoard(board) {
    while (board.hasChildNodes()) {
      board.lastChild.remove();
    }
  }

  return { renderBoard };
};

module.exports = View;
