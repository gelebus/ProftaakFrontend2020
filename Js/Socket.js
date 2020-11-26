function ConnectToSocket(token) {
  const socket = io('ws://localhost:3000');
  socket.emit('token', token);
  socket.on('game_info', response =>{
    console.log(response);
    StartGame(response);
  });
}

function StartGame(data){
  $('body').load('Game.html', ()=>{
    history.pushState('data', 'Battleships - Game', 'Game.html');
    document.title = 'Battleships - Game';
    $('span#LobbyId').text(data.game_code);
    $(`#Player${data.self_index + 1}`).text(data.players[data.self_index].name);
  });
}
