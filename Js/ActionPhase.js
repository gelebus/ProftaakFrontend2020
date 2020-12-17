function AttackShip(e){
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
  console.log(`Grid id: ${document.getElementById(gridID)}`);
  console.log(`Ship layout: ${shipLayout}`);
}