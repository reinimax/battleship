const Ship = coords => {
  let position = setPosition(coords);
  let length = position.length;
  let sunk = false;

  function setPosition(coords) {
    let position = [];
    let startX = Math.min(coords[0][0], coords[1][0]);
    let startY = Math.min(coords[0][1], coords[1][1]);
    let endX = Math.max(coords[0][0], coords[1][0]);
    let endY = Math.max(coords[0][1], coords[1][1]);

    if (startX > endX || endX > startX) {
      let start = Math.min(startX, endX);
      let end = Math.max(startX, endX);
      for (let i = start; i <= end; i++) {
        position.push({
          x: i,
          y: startY,
          hit: false
        });
      }
    }

    if (startY > endY || endY > startY) {
      let start = Math.min(startY, endY);
      let end = Math.max(startY, endY);
      for (let i = start; i <= end; i++) {
        position.push({
          x: startX,
          y: i,
          hit: false
        });
      }
    }
    return position;
  }

  function hit(coords) {
    position.forEach(pos => {
      if (pos.x === coords[0] && pos.y === coords[1]) {
        pos.hit = true;
      }
    });
    this.sunk = isSunk();
  }

  function isSunk() {
    return position.filter(pos => pos.hit === false).length <= 0;
  }

  return { position, length, sunk, hit };
};

module.exports = Ship;
