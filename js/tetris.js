// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down')
  let currentObject = getCurrentObject();
  console.log(currentObject);
}

function moveRight(obj) {
  console.log('moving right')
  let currentObject = getCurrentObject();
  console.log(currentObject);
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();
  console.log(currentObject);
}

// function createObj() {}

// interval 1 second

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()