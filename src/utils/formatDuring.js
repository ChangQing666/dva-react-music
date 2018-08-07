export default function formatDuring(mss){
  if (mss) {
    var minutes = parseInt(mss / 1000 / 60);
    var seconds = parseInt((mss % (1000 * 60)) / 1000);

    seconds = seconds > 9 ? seconds : '0' + seconds;
    return minutes >= 10 ? minutes : '0' + minutes + ":" + seconds;
  } else {
    return '00:00'
  }
}
