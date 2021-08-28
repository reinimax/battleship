const View = () => {
  function renderBoard(gameBoard, selector, isPlayerBoard = true) {
    const board = document.querySelector(selector);
    // make sure we clear the board first before populating it again
    clear(board);
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

  function prepareGameBoard(selectors) {
    const wrapper = document.querySelector('.main-wrapper');
    clear(wrapper);
    selectors.forEach(selector => {
      const subWrapper = document.createElement('div');
      subWrapper.classList.add(selector);
      wrapper.appendChild(subWrapper);
    });
  }

  function shipPlacement(gameBoard, selector) {
    const board = document.querySelector(selector);
    // make sure we clear the board first before populating it again
    clear(board);
    gameBoard.getBoard().forEach(obj => {
      const div = document.createElement('div');
      div.setAttribute('data-x', obj.x);
      div.setAttribute('data-y', obj.y);
      div.setAttribute('ondrop', 'drop(event)');
      div.setAttribute('ondragover', 'allowDrop(event)');
      // TODO: remove these once we can choose between random and manual placement
      if (obj.hasShip) div.classList.add('hasShip');
      if (obj.isHit) div.classList.add('isHit');

      board.appendChild(div);
    });
  }

  function clear(element) {
    while (element.hasChildNodes()) {
      element.lastChild.remove();
    }
  }

  return { renderBoard, shipPlacement, prepareGameBoard };
};

module.exports = View;
