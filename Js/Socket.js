const socket = io('ws://178.62.244.31:5050');

const GAME_STATE_LOBBY = 'lobby'
const GAME_STATE_NONE = 'none'
const GAME_STATE_SETUP = 'setup'
const GAME_STATE_ACTION = 'action'
const GAME_STATE_CONCLUDED = 'concluded'

let GameState = GAME_STATE_NONE;
let Players = [{playerName: 'Free slot',readyForAction: false,shipLayout: null,shotsOnGrid: []},
              {playerName: 'Free slot',readyForAction: false,shipLayout: null,shotsOnGrid: []},
              {playerName: 'Free slot',readyForAction: false,shipLayout: null,shotsOnGrid: []},
              {playerName: 'Free slot',readyForAction: false,shipLayout: null,shotsOnGrid: []}];
let AmountPlayers = 0;
let ActivePlayerID;
let AttackingPlayerId;

///////////////////////////////////////////////////////////
// Host or Join the lobby /////////////////////////////////
///////////////////////////////////////////////////////////

function ConnectToSocket(token) {
  socket.emit('token', token);
}

socket.on('player_joined', response => {
  Players[response.index].playerName = response.name;
  AmountPlayers++;
  $(`#Player${response.index + 1}`).text(response.name);
});

socket.on('game_info', response =>{
  GameState = GAME_STATE_LOBBY;

  $('body').load('Lobby.html', ()=>{
    history.pushState('data', `Battleships - ${GameState}`, 'Lobby');
    document.title = `Battleships - ${GameState}`;

    $('span#LobbyId').text(response.game_code);

    AmountPlayers = response.players.length;
    ActivePlayerID = response.self_index;

    $(`#Player${ActivePlayerID + 1}`).addClass('Active');
    $(`#CheckBoxPlayer${ActivePlayerID + 1}`).addClass('Active');

    for (let index = 0; index < response.players.length; index++) {
      Players[index].playerName = response.players[index].name;
      $(`#Player${index + 1}`).text(response.players[index].name);
      $(`#CheckBoxPlayer${index + 1}`).prop('checked', response.players[index].ready);
    }
  });
});

///////////////////////////////////////////////////////////
// Makes player ready -> Lobby, PlaceBoats ////////////////
///////////////////////////////////////////////////////////

function PlayerReady(data){
  socket.emit('ready', {ready: data});
}

socket.on('player_ready', response => {
  switch (GameState) {
    case GAME_STATE_LOBBY:
      $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', response.ready);
      break;
    case GAME_STATE_SETUP:
      Players[response.index].readyForAction = response.ready;
  
      let count = parseInt($(`#PlayersReady #count`).text());
      let newCount = Players[response.index].readyForAction == true ? count + 1 : count - 1;

      $(`#PlayersReady #count`).text(newCount);
      break;
    default:
      break;
  }
});

///////////////////////////////////////////////////////////
// Removes player info -> Lobby, PlaceBoats, ActionPhase //
///////////////////////////////////////////////////////////

socket.on('player_disconnected', response => {
  if(GameState != GAME_STATE_CONCLUDED){
    confirm(`${Players[response.index].playerName} has left the party!`);
  }

  Players[response.index].playerName = 'Free slot';
  Players[response.index].readyForAction = false;
  Players[response.index].shipLayout = null;
  Players[response.index].shotsOnGrid = [];
  AmountPlayers--;

  switch (GameState) {
    case GAME_STATE_LOBBY:
      $(`#Player${response.index + 1}`).text('Free slot');
      $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', false);
      break;
    case GAME_STATE_SETUP:
      $('#PlayersReady #amount').text(AmountPlayers);
      break;
    case GAME_STATE_ACTION:
      let opponents = document.querySelectorAll('[opponent-id]');
      opponents.forEach((e,i) => {
        if(e.getAttribute('opponent-id') == response.index) {
          let opponentListElement = document.getElementById('OpponentList');
          opponentListElement.removeChild(e);
        }
      });
      break;
    default:
      break;
  }
});

///////////////////////////////////////////////////////////
// Active while in Lobby //////////////////////////////////
///////////////////////////////////////////////////////////

socket.on('game_starting', response => {
  StartTimer(response.start_at);
});

socket.on('cancel_game_start', () => { 
  StopTimer();
});

socket.on('game_start', () => {
  StopTimer();
  GameState = GAME_STATE_SETUP;

  $('body').load('PlaceBoats.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    $('#PlayerName').text(Players[ActivePlayerID].playerName);
    $('#PlayersReady #amount').text(AmountPlayers);

    const audio = new Audio('/Audio/game_start.mp3');
    audio.play();
  });
});

///////////////////////////////////////////////////////////
// Active while in PlaceBoats /////////////////////////////
///////////////////////////////////////////////////////////

function ConfirmLayout(data){
  socket.emit('confirm_layout', data);
  Players[ActivePlayerID].shipLayout = data;
}

function UnlockLayout(){
  socket.emit('unlock_layout');
  Players[ActivePlayerID].shipLayout = null;
}

socket.on('invalid_layout', () => {
  alert('INVALID LAYOUT');
});

socket.on('action_phase_starting', response => {
  StartTimer(response.start_at);
});

socket.on('cancel_action_phase_start', () => {
  StopTimer();
});

socket.on('action_phase_start', () => {
  StopTimer();
  GameState = GAME_STATE_ACTION;

  $('body').load('ActionPhase.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    $('#PlayerName').text(Players[ActivePlayerID].playerName);
    $('#PlayerTurn').text(`${Players[0].playerName}'s turn`);

    AddLayoutToGrid('PlayerGrid', Players[ActivePlayerID].shipLayout);

    let setOpponent = false; 
    Players.forEach((e,i) => {
      if(i != ActivePlayerID && e.playerName != 'Free slot'){
        let anchorElement = document.createElement('a');
        anchorElement.setAttribute('opponent-id',i);
        anchorElement.innerText = e.playerName;
        anchorElement.addEventListener('click', SelectPlayer);
        document.getElementById('OpponentList').append(anchorElement);

        if (!setOpponent) {
          anchorElement.click();
          setOpponent = true;
        }
      }
    });
    
    const audio = new Audio('/Audio/game_start.mp3');
    audio.play();
  });
});

///////////////////////////////////////////////////////////
// Active while in ActionPhase ////////////////////////////
///////////////////////////////////////////////////////////

socket.on('player_eliminated', response => {
  if(ActivePlayerID != response.index){
    confirm(`${Players[response.index].playerName} has been eliminated!`);
  }else{
    confirm('Oh no! You are eliminated!');
  }
});

socket.on('player_turn', response => {
  $('#PlayerTurn').text(`${Players[response.index].playerName}'s turn`);

  AttackingPlayerId = response.index;

  if (response.index == ActivePlayerID) {
    const audio = new Audio('/Audio/player_turn.mp3');
    audio.play();
  }
});

function Shoot(){
  let enemyContainer = document.getElementById('EnemyName');
  let enemyId = parseInt(enemyContainer.getAttribute('opponent-id'));

  let selectedCellId = document.getElementsByClassName('grid-btn cell-selected')[0].id; 
  let cellPosX = parseInt(selectedCellId.split('_')[2]) - 1;
  let cellPosY = parseInt(selectedCellId.split('_')[1]) - 1;

  let data = { "target_index": enemyId, "x": cellPosX, "y": cellPosY };

  socket.emit('shoot', data);
}

socket.on('invalid_coordinates', () => {
  confirm('Error: Invalid Coordinates.');
});

socket.on('invalid_target', () => {
  confirm('Error: Please select a target.');
});

socket.on('ship_hit', response => {
  Players[response.target_index].shotsOnGrid.push({ "x":response.x, "y":response.y, "status":'hit' });

  if (AttackingPlayerId == ActivePlayerID) {
    const audio = new Audio('/Audio/shot_hit.mp3');
    audio.play();
  }

  if(ActivePlayerID == response.target_index){
    document.getElementById(`PlayerGrid_${response.y+1}_${response.x+1}`).classList.add('cell-shothit');
  }else{
    let selectedCell = document.getElementById(`EnemyGrid_${response.y+1}_${response.x+1}`); 
    selectedCell.classList.remove('cell-selected');
    selectedCell.classList.add('cell-shothit');
  }
});

socket.on('shot_missed', response => {
  Players[response.target_index].shotsOnGrid.push({ "x":response.x, "y":response.y, "status":'miss' });

  if (AttackingPlayerId == ActivePlayerID) {
    const audio = new Audio('/Audio/shot_missed.mp3');
    audio.play();
  }

  if(ActivePlayerID == response.target_index){
    document.getElementById(`PlayerGrid_${response.y+1}_${response.x+1}`).classList.add('cell-shotmissed');
  }else{
    let selectedCell = document.getElementById(`EnemyGrid_${response.y+1}_${response.x+1}`); 
    selectedCell.classList.remove('cell-selected');
    selectedCell.classList.add('cell-shotmissed');
  }
});

socket.on('ship_destroyed', response => {
  let battleships = [2,3,4,5];

  if(response.horizontal){
    for (let i = 0; i < battleships[response.type]; i++) {
      let cellID = `EnemyGrid_${response.y + 1}_${(response.x + 1) + i}`;

      if(response.target_index == ActivePlayerID){
        cellID = `PlayerGrid_${response.y + 1}_${(response.x + 1) + i}`;
      }
      
      document.getElementById(cellID).classList.add('ship-destroyed');
    }
  }else{
    for (let i = 0; i < battleships[response.type]; i++) {
      let cellID = `EnemyGrid_${(response.y + 1) + i}_${response.x + 1}`;
      
      if(response.target_index == ActivePlayerID){
        cellID = `PlayerGrid_${(response.y + 1) + i}_${response.x + 1}`;
      }

      document.getElementById(cellID).classList.add('ship-destroyed');
    }
  }
});

///////////////////////////////////////////////////////////
// Will Activate When Game is over/////////////////////////
///////////////////////////////////////////////////////////

socket.on('game_concluded', response => {
  GameState = GAME_STATE_CONCLUDED;

  $('body').load('GameOver.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    if(ActivePlayerID == response.winner_index){
      document.getElementById('VictoryTitle').style.display = 'block';
      document.getElementById('VictoryName').innerText = Players[ActivePlayerID].playerName;
      document.getElementById('VictoryText').style.display = 'block';      
    }else{
      document.getElementById('DefeatTitle').style.display = 'block';
      document.getElementById('DefeatName').innerText = Players[ActivePlayerID].playerName;
      document.getElementById('DefeatText').style.display = 'block';
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////
// Triggers if all your mates have left you alone /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

socket.on('game_closed', () => {
  confirm('You are the only player left, thus we need to redirect you to the main menu, because you can not play this game on your own.');
  document.location.href = '/MainMenu';
});