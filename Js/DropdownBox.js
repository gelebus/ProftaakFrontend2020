function DropdownSelect() {
    document.getElementById("OpponentList").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 

function SelectPlayer(e){
  let player = e.target;
  let playerContainer = document.getElementById('EnemyName');
  playerContainer.setAttribute('opponent-id', player.getAttribute('opponent-id'));
  playerContainer.innerText = player.innerText;

  document.getElementById('OpponentSelect').innerText = Players[player.getAttribute('opponent-id')].playerName

  FillEnemyGrid(player.getAttribute('opponent-id'));
}

function FillEnemyGrid(playerID){
  document.getElementById('EnemyGrid').innerHTML = '';
  CreateGrid('EnemyGrid');
  
  for (let i = 0; i < Players[playerID].shotsOnGrid.length; i++) {
    let cellInfo = Players[playerID].shotsOnGrid[i];
    let cellElement = document.getElementById(`EnemyGrid_${cellInfo.y+1}_${cellInfo.x+1}`);
    
    if(cellInfo.status == 'hit'){
      cellElement.classList.add('cell-shothit');
    }else{
      cellElement.classList.add('cell-shotmissed');
    }
  }


  console.log(Players[playerID].shotsOnGrid);
}