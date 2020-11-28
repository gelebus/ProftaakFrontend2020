function CreateGrid(gridId){
  for (let row = 0; row < 11; row++) {
    let divRow = CreateDivRow(row);
    document.getElementById(gridId).appendChild(divRow);
  }
}

function CreateDivRow(rowNumber){
  let divRow = document.createElement('div');
  divRow.classList.add('row');

  for (let column = 0; column < 11; column++) {
    divRow.appendChild(CreateDivColumn(rowNumber, column));
  }

  return divRow;
}

function CreateDivColumn(rowNumber, columnNumber){
  let lettersA2J = ['X','A','B','C','D','E','F','G','H','I','J'];

  let divColumn = document.createElement('div');

  if(rowNumber == 0){
    divColumn.classList.add('row','GridIndicator');
    divColumn.innerText = lettersA2J[columnNumber];
  }

  if(columnNumber != 0){
    if(rowNumber != 0){
      divColumn.classList.add('GameBtn');
    }
  }else{
    if(rowNumber != 0){    
      divColumn.classList.add('row','GridIndicator');
      divColumn.innerText = rowNumber;
    }else{
      divColumn.style.width = 40;
      divColumn.style.height = 40;
    }
  }

  return divColumn;
}