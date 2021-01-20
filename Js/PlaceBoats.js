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
    let shipMaxAmountElement = selectedShip.children[0].children[1];

    let shipAmount = parseInt(shipAmountElement.innerText);
    let shipMaxAmount = parseInt(shipMaxAmountElement.innerText);

    let cells = GetHighlightedCells();

    if(shipAmount > 0 && cells.length > 0){
      let shipID = GetFreeID(selectedShip.id, shipMaxAmount);

      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add('ship-placed', shipID);

        if(cells[i].classList.contains('orientation-row')){
          cells[i].classList.add('horizontal');
        }
      }

      shipAmount--;
      shipAmountElement.innerText = shipAmount;

      selectedShip.classList.remove('Active');
    }
  }else{
    let cell = e.target;

    if(cell.classList.contains('error-highlight')){
      let shipID = cell.classList[2].split('-')[0];
      let shipAmountElement = document.getElementById(shipID).children[0].children[0];
      let shipAmount = parseInt(shipAmountElement.innerText) + 1;

      shipAmountElement.innerText = shipAmount;
      
      $('.error-highlight').each((i,e)=>{
        e.classList.remove(e.classList[1],e.classList[2],e.classList[3],e.classList[4]);
      });
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

function GetFreeID(shipID, shipMaxAmount){
  for (let index = 1; index < shipMaxAmount + 1; index++) {
    let freeID = `${shipID}-${index}`;
    if($(`.${freeID}`).length == 0){
      return freeID;
    }
  }
}

function ResetGrid(){

  $('body').load('PlaceBoats.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    $('#PlayerName').text(Players[ActivePlayerID].playerName);
    $('#PlayersReady #amount').text(AmountPlayers);
  });
}