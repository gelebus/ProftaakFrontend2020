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
    e.classList.add('Active');
  }
}

function PlaceShip(e){
  let cell = e.target;
  let selectedShip = document.getElementsByClassName('AvailableShip Active');
  let isRotated = document.getElementById('CheckboxRotateShip').checked;
  
  if(selectedShip[0] != null){
    if(isRotated){
      if(DoesCellMeetRequirements(cell)){
        console.log('Vertical');
        console.log(cell);
      }
    }else{
      if(DoesCellMeetRequirements(cell)){
        console.log('Horizontal');
        console.log(cell);
      }
    }
  }
}

function DoesCellMeetRequirements(cell){
  let isGridBtn = cell.classList.contains('grid-btn');
  let isHighlighted = cell.classList.contains('highlight');
  return (isGridBtn && isHighlighted);
}

function ResetGrid(){
  let PlayerName = document.getElementById('PlayerName').innerText;
  $('body').load('PlaceBoats.html', () => {
    $('#PlayerName').text(PlayerName);
  });
}