const socket = io('ws://145.220.75.122');

function ConnectToSocket(token) {
  socket.emit('token', token);
}

socket.on('game_info', response =>{
  console.log(response);
  StartGame(response);
});

socket.on('player_joined', response => {
  $(`#Player${response.index + 1}`).text(response.name);
});

socket.on('player_disconnected', response => {
  $(`#Player${response.index + 1}`).text(`Player${response.index + 1}`);
  $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', false);
});

function StartGame(data){
  $('body').load('Game.html', ()=>{
    history.pushState('data', 'Battleships - Game', 'Game.html');
    document.title = 'Battleships - Game';

    $('span#LobbyId').text(data.game_code);

    $(`#CheckBoxPlayer${data.self_index + 1}`).addClass('Active');
    $(`#Player${data.self_index + 1}`).addClass('Active');

    for (let index = 0; index < data.players.length; index++) {
      $(`#Player${index + 1}`).text(data.players[index].name);
      $(`#CheckBoxPlayer${index + 1}`).prop('checked', data.players[index].ready);
    }
  });
}

function PlayerReady(data){
  socket.emit('ready', {ready: data});
}

socket.on('player_ready', response => {
  if($(`#CheckBoxPlayer${response.index + 1}`).length > 0)
  {
    $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', response.ready);
  }
  else
  {
    $(`#ConfirmLayout${response.index + 1}`).prop('checked', response.ready);
    let count = parseInt($(`#PlayersReady #count`).text());

    if($(`#ConfirmLayout${response.index + 1}`).prop('checked'))
    {
      count++;
    }
    else{
      count--;
    }

    $(`#PlayersReady #count`).text(count);
    
  }
  
});

socket.on('game_starting', response => {
  StartTimer();
});

socket.on('cancel_game_start', response => { 
  StopTimer();
});

function LoadPlaceBoatScreen(){
  let PlayerName = $('span.Active').text();
  let PlayersAmount = $('.lobby-player .Active').length;
  let PlayerIndex = $('input.Active').prop('id').split('CheckBoxPlayer')[1];

  $('body').load('PlaceBoats.html', () => {
    $('#PlayerName').text(PlayerName);
    $('#PlayersReady #amount').text(PlayersAmount);
    $(`#ConfirmLayout${PlayerIndex}`).addClass('Active');
  });
}

function ConfirmLayout(data){
  socket.emit('confirm_layout', data);
}

socket.on('invalid_layout', response => {
  alert('INVALID LAYOUT');
});

function UnlockLayout(){
  socket.emit('unlock_layout');
}

socket.on('action_phase_starting', response => {
  alert("action phase start")
});
