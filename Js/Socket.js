const socket = io('ws://145.220.75.122');

const GAME_STATE_LOBBY = 'lobby'
const GAME_STATE_NONE = 'none'
const GAME_STATE_SETUP = 'setup'
const GAME_STATE_ACTION = 'action'
const GAME_STATE_CONCLUDED = 'concluded'

let GameState = GAME_STATE_NONE;

///////////////////////////////////////////////////////////
// Host or Join the lobby /////////////////////////////////
///////////////////////////////////////////////////////////

function ConnectToSocket(token) {
  socket.emit('token', token);
}

socket.on('player_joined', response => {
  $(`#Player${response.index + 1}`).attr('player-status','Active');
  $(`#Player${response.index + 1}`).text(response.name);
});

socket.on('game_info', response =>{
  GameState = GAME_STATE_LOBBY;
  LoadLobby(response);
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
  switch (GameState) {
    case GAME_STATE_LOBBY:
      $(`#Player${response.index + 1}`).removeAttr('player-status');
      $(`#Player${response.index + 1}`).text('Free slot');
      $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', false);
      break;
    case GAME_STATE_SETUP:
      $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-status');
      $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-id');
      $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-name');
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
  LoadPlaceBoatScreen();
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
  LoadActionFaseScreen();
});

///////////////////////////////////////////////////////////
// Active while in ActionPhase ////////////////////////////
///////////////////////////////////////////////////////////

socket.on('game_concluded', () => {
  GameState = GAME_STATE_CONCLUDED;
});