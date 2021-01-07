function SelectedCell(e){
  let cell = e.target;
  let gridId = cell.parentElement.parentElement.id;
  console.log('You attack cell: ' + e.target.id);
  let cells = document.getElementsByClassName("grid-btn");

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('cell-selected');
  }

  if (gridId == 'EnemyGrid') {
    cell.classList.add('cell-selected');
  }
}

function AddLayoutToGrid(gridID, shipLayout){
  let playerGrid = document.getElementById(gridID);

  for (let i = 0; i < playerGrid.children.length; i++) {
    let row = playerGrid.children[i];
    for (let j = 0; j < row.children.length; j++) {
      let cell = row.children[j];
      let cellPosX = parseInt(cell.id.split('_')[2]) - 1;
      let cellPosY = parseInt(cell.id.split('_')[1]) - 1;

      let ship = GetShipPos(shipLayout, cellPosX, cellPosY);

      if(ship != null){
        PlaceShip(gridID, ship, cellPosX, cellPosY);
      }
    }
  }
}

function GetShipPos(shipLayout, x, y){
  for (let i = 0; i < shipLayout.length; i++) {
    if(shipLayout[i].x == x && shipLayout[i].y == y){
      return shipLayout[i];
    }
  }
  return null;
}

function PlaceShip(gridID, ship, cellPosX, cellPosY){
  let shipLength = ship.type + 2;
  if(ship.horizontal){
    for (let i = cellPosX; i < cellPosX + shipLength; i++) {
      let cell = document.getElementById(`${gridID}_${cellPosY + 1}_${i + 1}`);
      cell.classList.add('ship-placed');
    }
  }else{
    for (let i = cellPosY; i < cellPosY + shipLength; i++) {
      let cell = document.getElementById(`${gridID}_${i + 1}_${cellPosX + 1}`);
      cell.classList.add('ship-placed');
    }
  }
}

