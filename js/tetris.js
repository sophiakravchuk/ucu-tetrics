render();

function canMoveDown (object, step = 1) {
  const playground = traverseObjects()

  for (const [rowIndex, cellIndex] of object.position) {
    const nextRow = rowIndex - step
    if (nextRow < 0) return false // run out of playground
    if (nextRow > PLAYGROUND_LENTH - 1) continue // object is still outside the playground

    const ownCell = object.position.find(([r, c]) => (r === nextRow && c === cellIndex))
    if (ownCell) continue

    const nextCellAvalable = typeof playground[nextRow][cellIndex] === 'undefined'
    if (!nextCellAvalable) return false
  }
  return true
}

function canMoveHorizontal (direction, object) {
  const playground = traverseObjects()

  for (const [rowIndex, cellIndex] of object.position) {
    const nextCell = cellIndex + direction

    if (nextCell < 0 || nextCell > PLAYGROUND_WIDTH - 1) return false // run out of playground
    if (rowIndex > PLAYGROUND_LENTH - 1) continue;

    const ownCell = object.position.find(([r, c]) => (r === rowIndex && c === nextCell))
    if (ownCell) continue

    const nextCellAvalable = typeof playground[rowIndex][nextCell] === 'undefined'
    if (!nextCellAvalable) return false
  }
  return true
}

function checkAndDestroy () {
  const playground = traverseObjects()
  let destroyed = false

  for (let rowIndex = playground.length - 1; rowIndex >= 0; rowIndex--) {
    if (playground[rowIndex].includes(undefined)) continue

    destroyed = true

    objects.forEach(object => {
      let updated
      for (let i = 0; i < object.position.length; i++) {
        if (object.position[i][0] !== rowIndex) continue
        updated = delete object.position[i]
      }
      updated && compactObject(object)
    })
  }
  if (destroyed) {
    objects.forEach(object => moveDown(object))
    reRender()
  }
};

function compactObject (object) {
  object.position = object.position.filter(el => el) // remove emply elements of array
  if (object.position.length === 0) return delete object
  if (object.position.length === 1) return

  object.position = object.position.sort((a, b) => b[0] - a[0])

  for (let i = 0; i < object.position.length - 1; i++) {
    const rowIdex = object.position[i][0]
    const nextRowIndex = object.position[i + 1][0]
    if (rowIdex === nextRowIndex) continue // seating on the same plane
    if (rowIdex - nextRowIndex !== 1) object.position[i][0] -= 1
  }
}

function moveDown (object) {
  object = object || getCurrentObject()
  let currentRow = object.position.map(position => position[0]).sort((a, b) => a - b)[0]
  while (currentRow > 0) {
    if (canMoveDown(object, step = currentRow)) {
      object.position.forEach(position => (position[0] -= currentRow))
      break
    }
    currentRow--
  }
  reRender()
}

function moveHorizontal (direction) {
  const currentObject = getCurrentObject()
  if (!canMoveHorizontal(direction, currentObject)) return

  currentObject.position.forEach(position => (position[1] += direction))
  reRender()
}

function pauseGame () {
  console.log('pausing the game')
  clearInterval(gameInterval)
  gameInterval = null
}

function gameOver () {
  console.log('Game Over')
  clearInterval(gameInterval)
  gameInterval = null
}

// interval 1 second
var gameInterval = setInterval(() => {
  const playground = traverseObjects()
  const currentObject = getCurrentObject()

  if (playground.find(row => !row.includes(undefined))) { 
    return checkAndDestroy()
  }

  if (!canMoveDown(currentObject, 1)) {
    currentObject.state = 'static'
    if (playground[PLAYGROUND_LENTH - 1].find(el => el)) return gameOver()

    return createObj()
  };

  // 2. move object down
  currentObject.position.forEach(position => (position[0] -= 1))

  reRender()
}, 200)
