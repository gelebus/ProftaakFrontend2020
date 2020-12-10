function StartTimer(timeStamp){
  const startTime = new Date(timeStamp);
  const currentTime = new Date();
  let time = startTime - currentTime;

  document.getElementsByClassName('CountDown')[0].style.display = 'block';
  Timer = setInterval(function(){
    time -= 1;

    if(time == 0){
      document.getElementsByClassName('CountDown')[0].innerText = 'Next Phase!';
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