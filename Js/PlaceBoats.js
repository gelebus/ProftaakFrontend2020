function SelectShip(e) {
  let availableShips = document.getElementsByClassName('AvailableShip');

  for (let i = 0; i < availableShips.length; i++) {
    if(e != availableShips[i]){
      availableShips[i].classList.remove('Active');
    }
  }

  if(e.classList.contains('Active')){
    e.classList.remove('Active');
  }else{
    e.classList.add('Active');
  }
}

function PlaceShip(e){
  let selectedShip = document.getElementsByClassName('AvailableShip Active');
  
  if(selectedShip[0] != null){
    let cell = e.target;
    let cellRow = cell.parentElement;
    let rowCells = cellRow.children;
    let gridRows = cellRow.parentElement.children;
    
    let isRotated = document.getElementById('CheckboxRotateShip').checked;

    let shipLength = parseInt(selectedShip[0].children[2].innerText);
    let cellNumber = GetCellNumber(cell, rowCells);

    if(isRotated){
      if(DoesCellMeetRequirements(cell)){
        console.log('Vertical');
        PlaceShipVertical(shipLength, cellNumber, cellRow, gridRows, cell.id);
      }
    }else{
      if(DoesCellMeetRequirements(cell)){
        console.log('Horizontal');
        PlaceShipHorizontal(shipLength, cellNumber, rowCells, cell.id);
      }
    }
  }
}

function DoesCellMeetRequirements(cell){
  let isGridBtn = cell.classList.contains('grid-btn');
  let isHighlighted = cell.classList.contains('highlight');
  return (isGridBtn && isHighlighted);
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

function PlaceShipVertical(shipLength, cellNumber, cellRow, gridRows, cellID){
  let startRowShip = GetRowNumber(cellRow, gridRows);
  let endRowShip = startRowShip + shipLength;

  if(gridRows[endRowShip - 1] != null){
    for (let i = startRowShip; i < endRowShip; i++) {
      gridRows[i].children[cellNumber].classList.add('ship-placed');
      gridRows[i].children[cellNumber].id = cellID;
    }
  }
}

function PlaceShipHorizontal(shipLength, cellNumber, rowCells, cellID){
  let endCellShip = cellNumber + shipLength;

  if(rowCells[endCellShip - 1] != null){
    for (let i = cellNumber; i < endCellShip; i++) {
      rowCells[i].classList.add('ship-placed');
      rowCells[i].id = cellID;
    }
  }
}

function ResetGrid(){
  let PlayerName = document.getElementById('PlayerName').innerText;
  $('body').load('PlaceBoats.html', () => {
    $('#PlayerName').text(PlayerName);
  });
}