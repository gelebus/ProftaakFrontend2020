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
  let playerID = player.getAttribute('opponent-id');
  let playerContainer = document.getElementById('EnemyName');
  playerContainer.setAttribute('opponent-id', playerID);
  playerContainer.innerText = Players[playerID].playerName;
  FillEnemyGrid(playerID);
}

function FillEnemyGrid(playerID){
  document.getElementById('EnemyGrid').innerHTML = '';
  CreateGrid('EnemyGrid');
  
  for (let i = 0; i < Players[playerID].shotsOnGrid.length; i++) {
    let cellInfo = Players[playerID].shotsOnGrid[i];
    document.getElementById(`EnemyGrid_${cellInfo.y+1}_${cellInfo.x+1}`).classList.add(cellInfo.status);
  }
}