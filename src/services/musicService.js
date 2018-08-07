import apiPath from '../config/apiPath';
import request from '../utils/request';

// 获取排行榜列表
// export function getTopList(id){
//   let list = request('json',`${apiPath.TOP_LIST}?idx=${id}`,{method:'get'});
//   return list;
// }

export function getPlayistDetail(id){
  let list = request('json',`${apiPath.PLAYLIST_DETAIL}?id=${id}`,{method:'get'});
  return list;
}
export function getSongDetail(id){
  let detail = request('json',`${apiPath.SONG_DETAIL}?ids=${id}`,{method:'get'});
  return detail;
}

