export default function formatTime(time){
  if(time){
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    minutes = minutes <10 ? '0' + minutes : minutes;
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }else{
    return '00:00'
  }
}
