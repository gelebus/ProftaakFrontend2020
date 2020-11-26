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
  $(`#CheckBoxPlayer${response.index + 1}`).prop('checked', response.ready);
});

socket.on('game_starting', response => { 
  StartTimer();
});

socket.on('cancel_game_start', response => { 
  StopTimer();
});

function LoadPlaceBoatScreen(){
  $('body').load('PlaceBoats.html', () => {
    
  });
}