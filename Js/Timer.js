function StartTimer(timeStamp){
  time = 3;

  document.getElementsByClassName('CountDown')[0].style.display = 'block';
  document.getElementsByClassName('CountDown')[1].style.display = 'none';
  
  Timer = setInterval(function(){
    time -= 1;

    if(time == 0){
      document.getElementsByClassName('CountDown')[0].style.display = 'none';
      document.getElementsByClassName('CountDown')[1].style.display = 'block';
    }else if(time > 0){
      document.getElementById('CountDown').innerText = time;
    }
  }, 1000);
}

function StopTimer(){
  clearInterval(Timer);
  document.getElementsByClassName('CountDown')[0].style.display = 'none';
  document.getElementsByClassName('CountDown')[1].style.display = 'none';
  document.getElementById('CountDown').innerText = 3;
}