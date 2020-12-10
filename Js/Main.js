///////////////////////////////////////////////////////////
// Host or Join the lobby /////////////////////////////////
///////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////
// Active while in Lobby //////////////////////////////////
///////////////////////////////////////////////////////////

function LoadLobby(data){
  $('body').load('Lobby.html', ()=>{
    history.pushState('data', 'Battleships - Lobby', 'Lobby.html');
    document.title = 'Battleships - Lobby';

    $('span#LobbyId').text(data.game_code);

    $(`#CheckBoxPlayer${data.self_index + 1}`).addClass('Active');
    $(`#Player${data.self_index + 1}`).addClass('Active');

    for (let index = 0; index < data.players.length; index++) {
      $(`#Player${index + 1}`).attr('player-status','Active');
      $(`#Player${index + 1}`).attr('player-id',index);
      $(`#Player${index + 1}`).attr('player-name',data.players[index].name);
      $(`#Player${index + 1}`).text(data.players[index].name);
      $(`#CheckBoxPlayer${index + 1}`).prop('checked', data.players[index].ready);
    }
  });
}

function ReadyLobby(){
  PlayerReady($('input.Active').prop('checked') == true ? false : true);
}

function LoadPlaceBoatScreen(){
  let PlayerName = $('span.Active').text();
  let PlayerIndex = $('input.Active').prop('id').split('CheckBoxPlayer')[1];

  let Players = [];

  $('.player').each((i,e)=>{
    let el = e.children[0].children[0];
    Players.push({playerStatus: $(el).attr('player-status'), playerID: $(el).attr('player-id'), playerName: $(el).attr('player-name')});
  });

  $('body').load('PlaceBoats.html', () => {
    let PlayerAmount = 0;

    $('.player').each((i,e)=>{
      if(Players[i].playerStatus == "Active"){
        PlayerAmount++;
        $(e).attr('player-status', Players[i].playerStatus);
        $(e).attr('player-id', Players[i].playerID);
        $(e).attr('player-name', Players[i].playerName);
      }else{
        $(e).attr('player-status', Players[i].playerStatus);
      }
    });

    $('#PlayerName').text(PlayerName);
    $('#PlayersReady #amount').text(PlayerAmount);
    $(`#ConfirmLayout${PlayerIndex}`).addClass('Active');
  });
}

///////////////////////////////////////////////////////////
// Active while in PlaceBoats /////////////////////////////
///////////////////////////////////////////////////////////

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

function LoadActionFaseScreen(){
  let PlayerName = $('#PlayerName').text();
  $('body').load('ActionPhase.html', () => {
    $('#PlayerName').text(PlayerName);
  });
}

///////////////////////////////////////////////////////////
// Active while in ActionPhase ////////////////////////////
///////////////////////////////////////////////////////////
