function RemoveHighlight(){
  let gridIndicators = document.getElementsByClassName('grid-indicator');
  for (let i = 0; i < gridIndicators.length; i++) {
    gridIndicators[i].classList.remove('highlight');
  }

  let gridCells = document.getElementsByClassName('grid-btn');
  for (let i = 0; i < gridCells.length; i++) {
    gridCells[i].classList.remove('highlight');
  }
}

function AddHighlight(e){
  RemoveHighlight();

  HighlightIndicators(e.target);
  HighlightCells(e.target);
}

function HighlightIndicators(e){
  let elementSplit = e.id.split('_');
  let rowID = `${elementSplit[0]}_row_${elementSplit[1]}`;
  let colID = `${elementSplit[0]}_col_${elementSplit[2]}`;
  document.getElementById(rowID).classList.add('highlight');
  document.getElementById(colID).classList.add('highlight');
}

function HighlightCells(e){
  let cell = e;
  let cellRow = cell.parentElement;
  let rowCells = cellRow.children;
  let gridRows = cellRow.parentElement.children;

  let selectedShip = document.getElementsByClassName('AvailableShip Active');
  let isRotated = document.getElementById('CheckboxRotateShip').checked;

  if(selectedShip[0] != null){
    let shipLength = parseInt(selectedShip[0].children[2].innerText);
    let cellNumber = GetCellNumber(cell, rowCells);

    if(isRotated){
      HighlightCellsVertical(shipLength, cellNumber, cellRow, gridRows);
    }else{
      HighlightCellsHorizontal(shipLength, cellNumber, rowCells);
    }
  }
}

function GetRowNumber(cellRow, gridRows){
  for (let i = 0; i < gridRows.length; i++) {
    if(gridRows[i].children[0].id == cellRow.children[0].id){
      return i;
    }
  }
}

function GetCellNumber(cell, rowCells){
  for (let i = 0; i < rowCells.length; i++) {
    if(rowCells[i].id == cell.id){
      return i;
    }
  }
}

function HighlightCellsVertical(shipLength, cellNumber, cellRow, gridRows){
  let startRowShip = GetRowNumber(cellRow, gridRows);
  let endRowShip = startRowShip + shipLength;

  if(gridRows[endRowShip - 1] != null){
    for (let i = startRowShip; i < endRowShip; i++) {
      gridRows[i].children[cellNumber].classList.add('highlight');
    }
  }
}

function HighlightCellsHorizontal(shipLength, cellNumber, rowCells){
  let endCellShip = cellNumber + shipLength;

  if(rowCells[endCellShip - 1] != null){
    for (let i = cellNumber; i < endCellShip; i++) {
      rowCells[i].classList.add('highlight');
    }
  }
}