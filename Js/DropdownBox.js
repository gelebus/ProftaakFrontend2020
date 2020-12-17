/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function DropdownSelect() {
    document.getElementById("OpponentList").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
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
  console.log('Selected player: ' + e.target.getAttribute('opponent-id'));
  let playerContainer = document.getElementById('EnemyName');
  playerContainer.setAttribute('opponent-id', player.getAttribute('opponent-id'));
  playerContainer.innerText = player.innerText;
}