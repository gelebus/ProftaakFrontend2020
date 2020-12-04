function HostGame(){
  let username = $('#usernameInput').val();
  let game_code = $('#gamecodeInput').val();

  if(username !== ''){
    $('#usernameInput').css({borderColor: ''});
    GetToken(username, game_code);
  } else {
    $('#usernameInput').css({borderColor: 'red'});
  }
}

function JoinGame(){
  let username = $('#usernameInput').val();
  let game_code = $('#gamecodeInput').val();

  if(username !== '' && game_code !== ''){
    $('#usernameInput').css({borderColor: ''});
    $('#gamecodeInput').css({borderColor: ''});

    GetToken(username, game_code);
  } else {
    if(username === ''){
      $('#usernameInput').css({borderColor: 'red'});
    }
    if(game_code === ''){
      $('#gamecodeInput').css({borderColor: 'red'});
    }
  }
}

function GetToken(username, game_code){
  $.ajax({
    url: `http://145.220.75.122/${game_code ? 'join-game' : 'host-game'}`,
    data: JSON.stringify({ username, game_code }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      console.log(`${game_code ? 'join-game' : 'host-game'}`);
      ConnectToSocket(data.token);
    },
    error: (errMsg) => {
      console.log(errMsg);
    }
  });
}

function ReadyLobby(){
  if(!$('input.Active').prop('checked')){
    PlayerReady(true);
  } else {
    PlayerReady(false);
  }
}

function ReadyShips(){
  if(!$('input.Active').prop('checked')){
    ConfirmLayout(GetShips());
  }
  else{
    UnlockLayout();
  }
}

function GetShips(){
  let shipTypes = ['PatrolShip','Submarine','BattleShip','AircraftCarrier'];
  let shipAmount = [4,3,2,1];

  let output = [];

  for (let i = 0; i < shipTypes.length; i++) {
    GetShipInfo(output, i, shipTypes[i], shipAmount[i]);
  }

  return output;
}

function GetShipInfo(output, shipCount, shipType, shipAmount){
  for (let i = 1; i < shipAmount + 1; i++) {
    let shipClass = `${shipType}-${i}`;
    let ship = document.getElementsByClassName(shipClass);

    if(ship.length > 0){
      let x = ship[0].id.split('_')[2];
      let y = ship[0].id.split('_')[1];
      let type = shipCount;
      let horizontal = ship[0].classList.contains('horizontal');

      output.push({x: (parseInt(x) - 1), y: (parseInt(y) - 1), type, horizontal});
    }
  }
}