function HostGame(){
  let usernameInput = $('#usernameInput').val();

  if(usernameInput !== ""){
    $('#usernameInput').css({borderColor: ""});

    $.ajax({
      url: "http://localhost:3000/host-game",
      data: JSON.stringify({ username: usernameInput}),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log("Hosting a game.");
        console.log(data.token);

        ConnectToSocket(data.token);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    });
  } else {
    $('#usernameInput').css({borderColor: "red"});
  }
}

function JoinGame(){
  let usernameInput = $('#usernameInput').val();
  let gamecodeInput = $('#gamecodeInput').val();

  if(usernameInput !== "" && gamecodeInput !== ""){
    $('#usernameInput').css({borderColor: ""});
    $('#gamecodeInput').css({borderColor: ""});

    $.ajax({
      url: "http://localhost:3000/join-game",
      data: JSON.stringify({ username: usernameInput, game_code: gamecodeInput }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log("Joining a game.");
        console.log(data);

        ConnectToSocket(data.token);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    });
  } else {
    if(usernameInput === ""){
      $('#usernameInput').css({borderColor: "red"});
    }
    if(gamecodeInput === ""){
      $('#gamecodeInput').css({borderColor: "red"});
    }
  }
}

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
    history.pushState('data', '', 'Game.html');
    $('span#LobbyId').text(data.game_code);
    $(`#Player${data.self_index + 1}`).text(data.players[data.self_index].name);
  });
}