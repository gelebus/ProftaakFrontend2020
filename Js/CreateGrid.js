function CreateGrid(gridID, gridType){
  for (let row = 0; row < 11; row++) {
    let divRow = CreateDivRow(gridID, row, gridType);
    document.getElementById(gridID).appendChild(divRow);
  }
}

function CreateDivRow(gridID, rowNumber, gridType){
  let divRow = document.createElement('div');
  divRow.classList.add('row');

  for (let column = 0; column < 11; column++) {
    divRow.appendChild(CreateDivColumn(gridID, rowNumber, column, gridType));
  }

  return divRow;
}

function CreateDivColumn(gridID, rowNumber, columnNumber, gridType){
  let lettersA2J = ['X','A','B','C','D','E','F','G','H','I','J'];

  let divColumn = document.createElement('div');

  if(rowNumber == 0){
    let id = `${gridID}_col_${columnNumber}`;
    let indicator = lettersA2J[columnNumber];
    divColumn = CreateGridIndicator(divColumn, id, indicator);
  }else{
    if(columnNumber == 0){
      let id = `${gridID}_row_${rowNumber}`;
      let indicator = rowNumber;
      divColumn = CreateGridIndicator(divColumn, id, indicator);
    }else{
      divColumn.addEventListener('click', (gridType == 'PlaceShips' ? PlaceShip : SelectedCell));
      divColumn.addEventListener('mouseover', AddHighlight);
      divColumn.classList.add('grid-btn');
      divColumn.id = `${gridID}_${rowNumber}_${columnNumber}`;
    }
  }

  return divColumn;
}

function CreateGridIndicator(divElement, id, indicator){
  divElement.addEventListener('mouseover', RemoveHighlight);
  divElement.classList.add('row','grid-indicator');
  divElement.id = id;
  divElement.innerText = indicator;
  return divElement;
}