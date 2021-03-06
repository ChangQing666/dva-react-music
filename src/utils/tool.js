// 格式化时长
const formatTime = function (time){
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

// 用于播放列表数组去重
const dumplicateRemoveArr = function (arr){
  let hash = {};
  let outputArr = arr.reduce(function(item, next) {
    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
    return item;
  }, []);
  return outputArr;
}

function formatToSeconds(v){
  const minutes = Number(v.split(':')[0]);
  const seconds = Number(v.split(':')[1]);
  return minutes*60+seconds;
}
// 格式化lyric
const formatLyric = function(str){
  let arr = str.split('\n').slice(0,-1);
  let lyric = arr.map(item=>{
    let obj = {};
    let time = formatToSeconds(item.split(']')[0].slice(1));
    obj.time = time;
    obj.text = item.split(']')[1];
    return obj;
  });
  return lyric;
}

const splitArr = function(arr, step) {
  let R = [], F;
  for (F = 0; F < arr.length;) {
    R.push(arr.slice(F, F += step))
  }
  return R
}

const copyText =  function(txt){
  let oInput = document.createElement('input');
  oInput.value = txt;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display='none';
  alert('歌词复制成功');
}

const  timestampToTime = function(timestamp) {
  if(timestamp){
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+date.getDate():date.getDate();
    return Y+M+D;
  }else{
    return '';
  }

}
export {formatTime, dumplicateRemoveArr, formatLyric, splitArr, copyText,timestampToTime};
