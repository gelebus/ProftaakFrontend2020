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