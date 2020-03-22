// render DOM nodes according to the playground definition
function render () {
  const playground = traverseObjects()
  const playgroundNode = document.getElementById('playground')
  playgroundNode.innerHTML = ''

  for (let rowIndex = playground.length - 1; rowIndex >= 0; rowIndex--) {
    const rowNode = createRow(rowIndex)
    for (let cellIndex = 0; cellIndex < playground[rowIndex].length; cellIndex++) {
      rowNode.appendChild(createCell(cellIndex, playground[rowIndex][cellIndex]))
    }
    playgroundNode.appendChild(rowNode)
  }
}

function reRender () {
  const playground = traverseObjects()

  for (let rowIndex = playground.length - 1; rowIndex >= 0; rowIndex--) {
    const rowNode = document.getElementById(`row-${rowIndex}`)
    const cellNodes = [...rowNode.getElementsByClassName('cell')]

    for (let cellIndex = 0; cellIndex < playground[rowIndex].length; cellIndex++) {
      cellNodes[cellIndex].className = `cell cell-${cellIndex} ${playground[rowIndex][cellIndex]}`
    }
  }
}

// Creates <div class="row" id="row-9">
function createRow (rowIndex) {
  const rowNode = document.createElement('div')
  rowNode.setAttribute('id', `row-${rowIndex}`)
  rowNode.setAttribute('class', 'row')
  return rowNode
}

// Creates <div class="cell cell-1">1</div>
function createCell (cellIndex, color) {
  const cellNode = document.createElement('div')
  cellNode.setAttribute('class', `cell cell-${cellIndex} ${color}`)
  return cellNode
}
