import apiPath from '../config/apiPath';
import request from '../utils/request';

// 获取banners
export function getBanner(){
  return request('json',`${apiPath.BANNER}`,{method:'get'});
}

// 获取search
export function getSearch(keyword){
  return request('json',`${apiPath.SEARCH}?keywords=${keyword}`,{method:'get'});
}

// 获取searchSuggest
export function getSearchSuggest(keyword){
  return request('json',`${apiPath.SEARCH_SUGGEST}?keywords=${keyword}`,{method:'get'});
}

// 获取推荐歌单
export function getRecPlaylist(){
  return request('json',`${apiPath.REC_PLAYLIST}`,{method:'get'});
}

// 获取推荐新歌
export function getRecNewSong(){
  return request('json',`${apiPath.REC_NEWSONG}`,{method:'get'});
}

// 获取推荐MV
export function getRecMv(){
  return request('json',`${apiPath.REC_MV}`,{method:'get'});
}

// 获取推荐DJ
export function getRecDj(){
  return request('json',`${apiPath.REC_DJ}`,{method:'get'});
}

// 获取推荐专辑
export function getRecNewAlbum(){
  return request('json',`${apiPath.REC_NEWALBUM}`,{method:'get'});
}

// 获取专辑详情
export function getAlbum(id){
  return request('json',`${apiPath.ALBUM}?id=${id}`,{method:'get'});
}


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

