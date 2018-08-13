import apiPath from '../config/apiPath';
import request from '../utils/request';

// 获取排行榜列表
export function getToplist(id){
  return request('json',`${apiPath.TOP_LIST}?idx=${id}`,{method:'get'});
}
// 单个排行榜详情
export function getPlaylistDetail(id){
  return request('json',`${apiPath.PLAYLIST_DETAIL}?id=${id}`,{method:'get'});
}
// 歌曲详情
export function getSongDetail(id){
  return request('json',`${apiPath.SONG_DETAIL}?ids=${id}`,{method:'get'});
}
// 歌词
export function getLyric(id){
  return request('json',`${apiPath.LYRIC}?id=${id}`,{method:'get'});
}
// 歌手榜
export function getTopArtistList(){
  return  request('json',`${apiPath.TOP_ARTISTS_LIST}`,{method:'get'});
}
// 歌手详情
export function getArtistDetail(id){
  return  request('json',`${apiPath.ARTISTS}?id=${id}`,{method:'get'});
}

// 歌手MV
export function getArtistMV(id){
  return  request('json',`${apiPath.ARTISTS_MV}?id=${id}`,{method:'get'});
}
// MV详情
export function getMvDetail(id){
  return  request('json',`${apiPath.MV_DETAIL}?mvid=${id}`,{method:'get'});
}

