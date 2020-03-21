var getCurrentObject =  () => objects.find(object => object.state === 'falling');

var traverseObjects = () => {
  let playground = new Array(PLAYGROUND_LENTH).fill().map( el => (new Array(PLAYGROUND_WIDTH).fill()));

  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      if (playground[rowIndex]) {
        playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
      }
    })
  });

  return playground;
}

var getInitialPositions = (TYPE) => {
  if ( TYPE === "L") {
    return [
      [PLAYGROUND_LENTH + 2, 0],
      [PLAYGROUND_LENTH + 1, 0],
      [PLAYGROUND_LENTH, 0],
      [PLAYGROUND_LENTH, 1]
    ];
  } else if (TYPE === "T") {
    return [
      [PLAYGROUND_LENTH + 2, 2],
      [PLAYGROUND_LENTH + 1, 1],
      [PLAYGROUND_LENTH + 1, 2],
      [PLAYGROUND_LENTH,     2]
    ];
  } else if (TYPE === "I") {
    return [
      [PLAYGROUND_LENTH + 2, 2],
      [PLAYGROUND_LENTH + 1, 2],
      [PLAYGROUND_LENTH, 2]
    ];
  }
};

function createObj() {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  objects.push({
    state: 'falling',
    position: getInitialPositions(type),
    type,
  })
}
