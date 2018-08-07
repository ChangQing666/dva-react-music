import request from '../utils/request';
import MD5 from '../utils/md5';
export function translate (input) {
  var appid = '20180802000191229';
  var key   = 'pYJP4LSYwnpX_xMIdb5g';
  var salt  = (new Date).getTime();
  var query = input || 'apple';// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from  = 'en';
  var to    = 'zh';
  var str1  = appid + query + salt +key;
  var sign  = MD5(str1);

  return request('jsonp', `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${query}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`,{
    method: 'get',
    mode: "cors",
    credentials: 'include',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

// export function getProducts(){
//   return request('json','https://www.easy-mock.com/mock/59b1e434e0dc663341a19c3e/example/products',{
//     method: 'get',
//   })
// }
export function getProducts(){
  return request('json','http://localhost:3000/search?keywords=双截棍',{method:'get'})
}
