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
  let cellParent = cell.parentElement;
  let cellParentChildren = cellParent.children;

  let selectedShip = document.getElementsByClassName('AvailableShip Active');
  let isRotated = false;
  if(selectedShip[0] != null){
    if(isRotated){

    }else{
      let shipLength = parseInt(selectedShip[0].children[2].innerText);
      let startCellShip = GetCellNumber(cell, cellParentChildren);
      let endCellShip = startCellShip + shipLength;

      console.log(shipLength);
      console.log(startCellShip);
      console.log(endCellShip);
      console.log(cellParentChildren[startCellShip]);
      console.log(cellParentChildren[endCellShip - 1]);

      if(cellParentChildren[endCellShip - 1] != null){
        for (let i = startCellShip; i < endCellShip; i++) {
          cellParentChildren[i].classList.add('highlight');
        }
      }
    }
  }
}

function GetCellNumber(cell, cellParentChildren){
  for (let i = 0; i < cellParentChildren.length; i++) {
    if(cellParentChildren[i].id == cell.id){
      return i;
    }
  }
}