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

$('#PlayerReady').on('click', () => {
  if(!$('input.Active').prop('checked')){
    PlayerReady(true);
  } else {
    PlayerReady(false);
  }
});

function StartTimer(timertje){
  let time = 3;
  document.getElementsByClassName('CountDown')[0].style.display = 'block';

  Timer = setInterval(function(){
    
    console.log(time);
    console.log(timertje);

    if(time == 0){
      clearInterval(Timer);
      LoadPlaceBoatScreen();
    }
    
    time -= 1;

    if(time == 0){
      document.getElementsByClassName('CountDown')[0].innerText = 'Start Game!';
    }else{
      document.getElementById('CountDown').innerText = time;
    }
  }, 1000);
}

function StopTimer(){
  document.getElementsByClassName('CountDown')[0].style.display = 'none';
  document.getElementById('CountDown').innerText = '3';
  clearInterval(Timer);
}

function CreateGrid(gridId){
  for (let row = 0; row < 11; row++) {
    let lettersA2J = ['X','A','B','C','D','E','F','G','H','I','J'];

    let divRow = document.createElement('div');
    divRow.classList.add('row');

    for (let column = 0; column < 11; column++) {
      let divColumn = document.createElement('div');

      if(row == 0){
        divColumn.classList.add('row','GridIndicator');
        divColumn.innerText = lettersA2J[column];
      }

      if(column != 0){
        if(row != 0){
          divColumn.classList.add('GameBtn');
        }
      }else{
        if(row != 0){    
          divColumn.classList.add('row','GridIndicator');
          divColumn.innerText = row;
        }else{
          divColumn.style.width = 40;
          divColumn.style.height = 40;
        }
      }
      divRow.appendChild(divColumn);
    }
    document.getElementById(gridId).appendChild(divRow);
  }
}

