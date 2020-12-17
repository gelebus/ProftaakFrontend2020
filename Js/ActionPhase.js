function AttackShip(e){
  alert('You attack cell: ' + e.target.id);
}

function AddLayoutToGrid(gridID, shipLayout){
  console.log(`Grid id: ${document.getElementById(gridID)}`);
  console.log(`Ship layout: ${shipLayout}`);
}