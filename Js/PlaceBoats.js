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
    if(e.children[0].children[0].innerText != "0"){
      e.classList.add('Active');
    }
  }
}

function PlaceShip(e){
  let selectedShip = document.getElementsByClassName('AvailableShip Active')[0];
  let selectedShipID = selectedShip.id;
  
  if(selectedShip != null){
    let shipAmountElement = selectedShip.children[0].children[0];
    let shipAmount = parseInt(shipAmountElement.innerText);
    if(shipAmount > 0){
      let cells = GetHighlightedCells();
  
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add('ship-placed',`${selectedShipID}-${shipAmount}`);
      }

      shipAmount--;
      shipAmountElement.innerText = shipAmount;

      if(shipAmount == 0){
        selectedShip.classList.remove('Active');
      }
    }
  }
}

function GetHighlightedCells(){
  let gridCells = document.getElementsByClassName('grid-btn');
  let highlightedCells = [];

  for (let i = 0; i < gridCells.length; i++) {
    if(gridCells[i].classList.contains('success-highlight')){
      highlightedCells.push(gridCells[i]);
    }
  }

  return highlightedCells;
}

function ResetGrid(){
  let PlayerName = document.getElementById('PlayerName').innerText;
  $('body').load('PlaceBoats.html', () => {
    $('#PlayerName').text(PlayerName);
  });
}