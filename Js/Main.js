function HostGame(){
  let usernameInput = $('#usernameInput').val();

  if(usernameInput !== ''){
    $('#usernameInput').css({borderColor: ''});

    $.ajax({
      url: 'http://145.220.75.122/host-game',
      data: JSON.stringify({ username: usernameInput}),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log('Hosting a game.');
        console.log(data.token);

        ConnectToSocket(data.token);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    });
  } else {
    $('#usernameInput').css({borderColor: 'red'});
  }
}

function JoinGame(){
  let usernameInput = $('#usernameInput').val();
  let gamecodeInput = $('#gamecodeInput').val();

  if(usernameInput !== '' && gamecodeInput !== ''){
    $('#usernameInput').css({borderColor: ''});
    $('#gamecodeInput').css({borderColor: ''});

    $.ajax({
      url: 'http://145.220.75.122/join-game',
      data: JSON.stringify({ username: usernameInput, game_code: gamecodeInput }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log('Joining a game.');
        console.log(data);

        ConnectToSocket(data.token);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    });
  } else {
    if(usernameInput === ''){
      $('#usernameInput').css({borderColor: 'red'});
    }
    if(gamecodeInput === ''){
      $('#gamecodeInput').css({borderColor: 'red'});
    }
  }
}

$('#PlayerReady').on('click', () => {
  if(!$('input.Active').prop('checked')){
    PlayerReady(true);
  } else {
    PlayerReady(false);
  }
});



function StartTimer(){
  let time = 3;
  document.getElementsByClassName('CountDown')[0].style.display = 'block';

  Timer = setInterval(function(){
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

