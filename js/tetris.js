function canMoveDown(object) {
  let playground = traverseObjects();

  for (let [rowIndex, cellIndex] of object.position) {
    const nextRow = rowIndex - 1;
    
    if (nextRow < 0) { return false }; // run out of playground
    if (nextRow > PLAYGROUND_LENTH - 1) { return true }; // object is still outside the playground

    const ownCell = object.position.find(([r, c]) => (r === nextRow && c === cellIndex));
    if (ownCell) { continue };

    const nextCellAvalable = typeof playground[nextRow][cellIndex] === 'undefined';
    if (!nextCellAvalable) { return false };
  }
  return true;
}

function canMoveHorizontal(direction, object) {
  let playground = traverseObjects();

  for (let [rowIndex, cellIndex] of object.position) {
    const nextCell = cellIndex + direction;
    
    if (nextCell < 0 || nextCell > PLAYGROUND_WIDTH - 1) { return false }; // run out of playground

    const ownCell = object.position.find(([r, c]) => (r === rowIndex && c === nextCell));
    if (ownCell) { continue };

    const nextCellAvalable = typeof playground[rowIndex][nextCell] === 'undefined';
    if (!nextCellAvalable) { return false };
  }
  return true;
}

function checkAndDestroy() {
  let playground = traverseObjects();
  let deletedRows = [];
  for (let rowIndex = playground.length - 1; rowIndex >= 0; rowIndex-- ) {
    if(playground[rowIndex].includes(undefined)) { continue };

    deletedRows.push(rowIndex);

    objects.forEach(object => {
      let updated;
      for (let i = 0; i < object.position.length; i++ ) {
        if (object.position[i][0] !== rowIndex) { continue }
        updated = delete object.position[i]
      }
      updated && (object.position = object.position.filter(el => el)); // remove emply elements of array
    })
  }
  deletedRows.length > 0 && render();
};

function moveDown(object) {
  object = object || getCurrentObject();
  object.position.forEach(position => {

  });
}

function moveHorizontal(direction) {
  console.log('moving right')
  let currentObject = getCurrentObject();
  if (!canMoveHorizontal(direction, currentObject)) { return };
  currentObject.position.forEach(position => position[1] += direction);
  render();
}

function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
  gameInterval = null;
}

function gameOver() {
  console.log('Game Over')
  clearInterval(gameInterval);
  gameInterval = null;
}

// interval 1 second
var gameInterval = setInterval(() => {
  let playground = traverseObjects();
  let currentObject = getCurrentObject();

  if (!canMoveDown(currentObject)) { 
    currentObject.state = 'static';
    if (playground[PLAYGROUND_LENTH - 1].find(el => el)) { return gameOver() };
    checkAndDestroy();
    return createObj();
  };

  // 2. move object down
  currentObject.position.forEach(position => position[0] -= 1);

  render()
}, 200);
