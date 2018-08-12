import apiPath from '../config/apiPath';
import request from '../utils/request';

// 获取排行榜列表
export function getToplist(id){
  let list = request('json',`${apiPath.TOP_LIST}?idx=${id}`,{method:'get'});
  return list;
}
// 单个排行榜详情
export function getPlaylistDetail(id){
  let list = request('json',`${apiPath.PLAYLIST_DETAIL}?id=${id}`,{method:'get'});
  return list;
}
// 歌曲详情
export function getSongDetail(id){
  let detail = request('json',`${apiPath.SONG_DETAIL}?ids=${id}`,{method:'get'});
  return detail;
}
// 歌词
export function getLyric(id){
  let detail = request('json',`${apiPath.LYRIC}?id=${id}`,{method:'get'});
  return detail;
}

export function getTopArtistList(){
  return  request('json',`${apiPath.TOP_ARTISTS_LIST}`,{method:'get'});
}
export function getArtistDetail(id){
  return  request('json',`${apiPath.ARTISTS}?id=${id}`,{method:'get'});
}

