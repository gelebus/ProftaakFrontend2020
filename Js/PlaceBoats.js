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
  
  if(selectedShip != null){
    let shipAmountElement = selectedShip.children[0].children[0];
    let shipAmount = parseInt(shipAmountElement.innerText);
    let cells = GetHighlightedCells();

    if(shipAmount > 0 && cells.length > 0){
      for (let i = 0; i < cells.length; i++) {
        if(cells[i].classList.contains('orientation-row')){
          cells[i].classList.add('horizontal');
        }
        cells[i].classList.add('ship-placed',`${selectedShip.id}-${shipAmount}`);
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
  let PlayerName = $('#PlayerName').text();
  let playerReadyCount = $('#PlayersReady #count').text();
  let playerAmount = $('#PlayersReady #amount').text();

  $('body').load('PlaceBoats.html', () => {
    $('#PlayerName').text(PlayerName);
    $('#PlayersReady #count').text(playerReadyCount);
    $('#PlayersReady #amount').text(playerAmount);
  });
}