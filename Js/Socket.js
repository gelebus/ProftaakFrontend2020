const socket = io('ws://localhost:3000');
// const socket = io('ws://145.220.75.122');

const GAME_STATE_LOBBY = 'lobby'
const GAME_STATE_NONE = 'none'
const GAME_STATE_SETUP = 'setup'
const GAME_STATE_ACTION = 'action'
const GAME_STATE_CONCLUDED = 'concluded'

let GameState = GAME_STATE_NONE;
let Players = [{playerStatus: 'inactive',playerName: 'Free slot'},
              {playerStatus: 'inactive',playerName: 'Free slot'},
              {playerStatus: 'inactive',playerName: 'Free slot'},
              {playerStatus: 'inactive',playerName: 'Free slot'}];
let AmountPlayers = 0;
let ActivePlayer;

///////////////////////////////////////////////////////////
// Host or Join the lobby /////////////////////////////////
///////////////////////////////////////////////////////////

function ConnectToSocket(token) {
  socket.emit('token', token);
}

socket.on('player_joined', response => {
  Players[response.index].playerStatus = 'active';
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
    ActivePlayer = response.self_index;

    $(`#Player${ActivePlayer + 1}`).addClass('Active');
    $(`#CheckBoxPlayer${ActivePlayer + 1}`).addClass('Active');

    for (let index = 0; index < response.players.length; index++) {
      Players[index].playerStatus = 'active';
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
      $(`#ConfirmLayout${response.index + 1}`).prop('checked', response.ready);

      let count = parseInt($(`#PlayersReady #count`).text());
      $(`#PlayersReady #count`).text($(`#ConfirmLayout${response.index + 1}`).prop('checked') == true ? count++ : count--);
      break;
    default:
      break;
  }
});

///////////////////////////////////////////////////////////
// Removes player info -> Lobby, PlaceBoats, ActionPhase //
///////////////////////////////////////////////////////////

socket.on('player_disconnected', response => {
  Players[response.index].playerStatus = 'inactive';
  Players[response.index].playerName = 'Free slot';
  AmountPlayers--;

  switch (GameState) {
    case GAME_STATE_LOBBY:
      $(`#Player${response.index + 1}`).text('Free slot');
      $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', false);
      break;
    case GAME_STATE_SETUP:
      $(`#ConfirmLayout${response.index + 1}`).prop('checked', false);
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
  GameState = GAME_STATE_SETUP;
  
  let PlayerName = $('span.Active').text();
  let PlayerIndex = $('input.Active').prop('id').split('CheckBoxPlayer')[1];

  $('body').load('PlaceBoats.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    $('#PlayerName').text(PlayerName);
    $('#PlayersReady #amount').text(AmountPlayers);
    $(`#ConfirmLayout${PlayerIndex}`).addClass('Active');
  });
});

///////////////////////////////////////////////////////////
// Active while in PlaceBoats /////////////////////////////
///////////////////////////////////////////////////////////

function ConfirmLayout(data){
  socket.emit('confirm_layout', data);
}

function UnlockLayout(){
  socket.emit('unlock_layout');
}

socket.on('invalid_layout', () => {
  alert('INVALID LAYOUT');
});

socket.on('action_phase_starting', response => {
  StartTimer(response.start_at);
});

socket.on('action_phase_start', () => {
  GameState = GAME_STATE_ACTION;

  let PlayerName = $('#PlayerName').text();

  $('body').load('ActionPhase.html', () => {
    history.pushState('data', `Battleships - ${GameState}`, 'Game');
    document.title = `Battleships - ${GameState}`;

    $('#PlayerName').text(PlayerName);
  });
});

///////////////////////////////////////////////////////////
// Active while in ActionPhase ////////////////////////////
///////////////////////////////////////////////////////////

socket.on('game_concluded', response => {
  GameState = GAME_STATE_CONCLUDED;

});