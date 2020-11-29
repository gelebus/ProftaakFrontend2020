function RemoveHighlight(){
  let gridIndicators = document.getElementsByClassName('grid-indicator');
  for (let i = 0; i < gridIndicators.length; i++) {
    gridIndicators[i].classList.remove('highlight');
  }
}

function HighlightRowColumn(e){
  RemoveHighlight();

  let row = e.target.id.split('_')[0];
  let col = e.target.id.split('_')[1];
  document.getElementById(`row_${row}`).classList.add('highlight');
  document.getElementById(`col_${col}`).classList.add('highlight');
}