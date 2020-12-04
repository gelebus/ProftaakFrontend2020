function RemoveHighlight(){
  let gridIndicators = document.getElementsByClassName('grid-indicator');
  for (let i = 0; i < gridIndicators.length; i++) {
    gridIndicators[i].classList.remove('highlight');
  }

  let gridCells = document.getElementsByClassName('grid-btn');
  for (let i = 0; i < gridCells.length; i++) {
    gridCells[i].classList.remove('success-highlight','error-highlight','orientation-row','orientation-col');
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
  let selectedShip = document.getElementsByClassName('AvailableShip Active')[0];

  if(selectedShip != null){
    let selectedShipLength = parseInt(selectedShip.children[2].innerText);

    let cell = e;
    let gridName = cell.id.split('_')[0];
    let cellRowNumber = parseInt(cell.id.split('_')[1]);
    let cellColNumber = parseInt(cell.id.split('_')[2]);
    
    let isRotated = document.getElementById('CheckboxRotateShip').checked;

    let startCellShip;

    if(isRotated){
      startCellShip = cellRowNumber;
    }else{
      startCellShip = cellColNumber;
    }
    
    let endCellShip = startCellShip + selectedShipLength;

    let shipInGrid = true;
    for (let i = endCellShip - 1; i >= startCellShip; i--) {
      let cellID;
      
      if(isRotated){
        cellID = `${gridName}_${i}_${cellColNumber}`;
      }else{
        cellID = `${gridName}_${cellRowNumber}_${i}`;
      }

      let cell = document.getElementById(cellID);

      if(cell == null){
        shipInGrid = false;
      }

      if(shipInGrid && IsShipNear(gridName, cellRowNumber, cellColNumber, startCellShip, endCellShip, isRotated)){
        cell.classList.add('success-highlight', isRotated != true ? 'orientation-row' : 'orientation-col');
      }else{
        if(cell != null){
          cell.classList.add('error-highlight');
        }
      }
    }
  }
}

function IsShipNear(gridName, cellRowNumber, cellColNumber, startCellShip, endCellShip, isRotated){
  let isAble = true;

  for (let i = startCellShip - 1; i < endCellShip + 1; i++) {
    let cellLeftID;
    let cellCenterID;
    let cellRightID;

    if(isRotated){
      cellLeftID = `${gridName}_${i}_${cellColNumber - 1}`;
      cellCenterID = `${gridName}_${i}_${cellColNumber}`;
      cellRightID = `${gridName}_${i}_${cellColNumber + 1}`;
    }else{
      cellLeftID = `${gridName}_${cellRowNumber - 1}_${i}`;
      cellCenterID = `${gridName}_${cellRowNumber}_${i}`;
      cellRightID = `${gridName}_${cellRowNumber + 1}_${i}`;
    }

    isAble = CellIsUsed(isAble, cellLeftID);
    isAble = CellIsUsed(isAble, cellCenterID);
    isAble = CellIsUsed(isAble, cellRightID);
  }

  return isAble;
}

function CellIsUsed(isAble, cellID){
  let cell = document.getElementById(cellID);
  if(cell != null && cell.classList.contains('ship-placed')){
    return false;
  }
  return isAble;
}