function StartTimer(data){
  let time = 3;
  document.getElementsByClassName('CountDown')[0].style.display = 'block';
  Timer = setInterval(function(){
    if(time == 0){
      clearInterval(Timer);
      if(data == 1)
      {
        LoadActionFaseScreen();      ;
      }
      else{
        LoadPlaceBoatScreen();
      }
    }
    
    time -= 1;

    if(time == 0){
      document.getElementsByClassName('CountDown')[0].innerText = 'Start Game!';
    }else if(time > 0){
      document.getElementById('CountDown').innerText = time;
    }
  }, 1000);
}

function StopTimer(){
  document.getElementsByClassName('CountDown')[0].style.display = 'none';
  document.getElementById('CountDown').innerText = '3';
  clearInterval(Timer);
}