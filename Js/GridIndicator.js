function RemoveHighlight(){
  let gridIndicators = document.getElementsByClassName('grid-indicator');
  for (let i = 0; i < gridIndicators.length; i++) {
    gridIndicators[i].classList.remove('highlight');
  }
}

function AddHighlight(e){
  RemoveHighlight();

  let targetSplit = e.target.id.split('_');
  let rowID = `${targetSplit[0]}_row_${targetSplit[1]}`;
  let colID = `${targetSplit[0]}_col_${targetSplit[2]}`;
  document.getElementById(rowID).classList.add('highlight');
  document.getElementById(colID).classList.add('highlight');
}