const getCurrentObject = () => objects.find(object => object.state === 'falling')

const traverseObjects = () => {
  const playground = new Array(PLAYGROUND_LENTH).fill().map(_el => (new Array(PLAYGROUND_WIDTH).fill()))

  objects.forEach(object => {
    object.position.forEach(([rowIndex, cellIndex]) => {
      if (playground[rowIndex]) {
        playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
      }
    })
  })

  return playground
}

const getInitialPositions = (TYPE) => {
  if (TYPE === 'L') {
    return [
      [PLAYGROUND_LENTH + 2, parseInt(PLAYGROUND_WIDTH / 2) + 1],
      [PLAYGROUND_LENTH + 1, parseInt(PLAYGROUND_WIDTH / 2) + 1],
      [PLAYGROUND_LENTH, parseInt(PLAYGROUND_WIDTH / 2) + 1],
      [PLAYGROUND_LENTH, parseInt(PLAYGROUND_WIDTH / 2) + [2, 0][Math.floor(Math.random() * 2)]]
    ]
  } else if (TYPE === 'T') {
    return [
      [PLAYGROUND_LENTH + 2, parseInt(PLAYGROUND_WIDTH / 2) + 2],
      [PLAYGROUND_LENTH + 1, parseInt(PLAYGROUND_WIDTH / 2) + [1, 3][Math.floor(Math.random() * 2)]],
      [PLAYGROUND_LENTH + 1, parseInt(PLAYGROUND_WIDTH / 2) + 2],
      [PLAYGROUND_LENTH, parseInt(PLAYGROUND_WIDTH / 2) + 2]
    ]
  } else if (TYPE === 'I') {
    return [
      [PLAYGROUND_LENTH + 3, parseInt(PLAYGROUND_WIDTH / 2) + 2],
      [PLAYGROUND_LENTH + 2, parseInt(PLAYGROUND_WIDTH / 2) + 2],
      [PLAYGROUND_LENTH + 1, parseInt(PLAYGROUND_WIDTH / 2) + 2],
      [PLAYGROUND_LENTH, parseInt(PLAYGROUND_WIDTH / 2) + 2]
    ]
  }
}

const createObj = () => {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)]
  objects.push({
    state: 'falling',
    position: getInitialPositions(type),
    type
  })
}
