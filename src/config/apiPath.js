const domain = `http://music.cqfee.top/api`;
const apiPath = {
  BANNER:          `${domain}/banner`,
  SEARCH:          `${domain}/search`,
  SEARCH_SUGGEST:  `${domain}/search/suggest`,

  REC_PLAYLIST:    `${domain}/personalized?limit=20`,//推荐歌单
  REC_NEWSONG:     `${domain}/personalized/newsong?limit=10`,//推荐新音乐
  REC_MV:          `${domain}/personalized/mv`,//推荐mv
  REC_DJ:          `${domain}/personalized/djprogram`,//推荐电台
  REC_NEWALBUM:    `${domain}/top/album`, // 获取专辑详情
  ALBUM:           `${domain}/album`, // 获取新碟上架
  PLAYLIST:        `${domain}/top/playlist/highquality`, // 获取精品歌单
  MVFIRST:         `${domain}/mv/first`, // 获取最新MV
  TOP_LIST:        `${domain}/top/list`,         //获取排行榜列表 GET  /top/list?idx=6  0云音乐新歌榜 1云音乐热歌榜 2网易原创歌曲榜 3云音乐飙升榜 4云音乐国电榜 5UK排行榜周榜
  PLAYLIST_DETAIL: `${domain}/playlist/detail`,  //获取歌单详情 GET  /playlist/detail?id=3779629  0云音乐新歌榜 1云音乐热歌榜 2网易原创歌曲榜 3云音乐飙升榜 4云音乐国电榜 5UK排行榜周榜
  MUSIC_URL:       `${domain}/music/url`,        //获取音乐url   GET /music/url?id=33894312&proxy=http://39.104.104.12:9520
  SONG_DETAIL:     `${domain}/song/detail`,      //歌曲详情    song/detail?ids=1297750680
  LYRIC:           `${domain}/lyric`,            //获取歌词          /lyric?id=33894312
  ARTISTS:         `${domain}/artists`,         // 歌手单曲 /artists?id=1203045
  TOP_ARTISTS_LIST:`${domain}/toplist/artist`,         // 歌手榜 /artists
  ARTISTS_MV      :`${domain}/artist/mv`,         // 歌手榜 /artists
  MV_DETAIL       :`${domain}/mv`,         // 歌手榜 /artists
}
export default apiPath;
