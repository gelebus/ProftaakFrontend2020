const socket = io('ws://145.220.75.122');

function ConnectToSocket(token) {
  socket.emit('token', token);
}

function PlayerReady(data){
  socket.emit('ready', {ready: data});
}

socket.on('player_joined', response => {
  $(`#Player${response.index + 1}`).attr('player-status','Active');
  $(`#Player${response.index + 1}`).text(response.name);
});

socket.on('player_disconnected', response => {
  if($(`#Player${response.index + 1}`).length > 0){
    $(`#Player${response.index + 1}`).removeAttr('player-status');
    $(`#Player${response.index + 1}`).text(`Player${response.index + 1}`);
  }
  if($(`#CheckBoxPlayer${response.index + 1}`).length > 0){
    $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', false);
  }
  if($(`#ConfirmLayout${response.index + 1}`).length > 0){
    $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-status');
    $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-id');
    $(`#ConfirmLayout${response.index + 1}`).removeAttr('player-name');
    $(`#ConfirmLayout${response.index + 1}`).prop('checked', false);
  }
});

socket.on('player_ready', response => {
  if($(`#CheckBoxPlayer${response.index + 1}`).length > 0){
    $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', response.ready);
  }else{
    $(`#ConfirmLayout${response.index + 1}`).prop('checked', response.ready);
    let count = parseInt($(`#PlayersReady #count`).text());

    if($(`#ConfirmLayout${response.index + 1}`).prop('checked')){
      count++;
    }else{
      count--;
    }

    $(`#PlayersReady #count`).text(count);
  }
});

socket.on('game_info', response =>{
  StartGame(response);
});

socket.on('game_starting', response => {
  StartTimer(0);
});

socket.on('cancel_game_start', response => { 
  StopTimer();
});

function ConfirmLayout(data){
  socket.emit('confirm_layout', data);
}

function UnlockLayout(){
  socket.emit('unlock_layout');
}

socket.on('invalid_layout', response => {
  alert('INVALID LAYOUT');
});

socket.on('action_phase_starting', response => {
  StartTimer(1);
});
