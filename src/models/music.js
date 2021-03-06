import {
  getRecPlaylist,
  getRecNewSong,
  getRecMv,
  getRecDj,
  getRecNewAlbum,
  getAlbum,
  getToplist,
  getPlaylistDetail,
  getSongDetail,
  getCheckMusic,
  getLyric,
  getMusicUrl,
  getTopArtistList,
  getArtistDetail,
  getArtistMV,
  getMvDetail,
  getBanner,
  getSearch,
  getSearchSuggest,
} from '../services/musicService';
import {dumplicateRemoveArr, formatLyric} from "../utils/tool";
import key from 'keymaster';

export default {
  namespace: 'music',
  state: {
    banner: [],
    home: {
      playlist: [],
      newSong: [],
      mv: [],
      dj: [],
      newAlbum: [],
    },
    song: {
      songDetail:{},
      songLyric:[],
    },
    search:{},
    searchSuggest:{songlist:[]},
    album: {
      songs: [],
      album: {},
    },
    topListId: 0,
    topListDesc: {},
    toplist: [],
    songlist: [],
    topArtistList: [],
    artistDetail: {artist: {}, hotSongs: []},
    artistMV: [],
    mvDetail: {},
    player: {
      isPlay: false,
      ended: false,
      currentSongId: localStorage.getItem('currentSongId'),
      currentSongUrl: localStorage.getItem('currentSongUrl'),
      playlist: localStorage.getItem('_PLAYLIST') ? JSON.parse(localStorage.getItem('_PLAYLIST')) : [],
      loopType: 1,
      songDetail: localStorage.getItem('songDetail') ? JSON.parse(localStorage.getItem('songDetail')) : {},
      lyric: null,
    }
  },
  reducers: {
    banner(state, {payload}) {
      return {
        ...state,
        banner: payload,
      }
    },
    search(state, payload){
      return {
        ...state,
        search: payload
      }
    },
    searchSuggest(state, {payload}){
      return {
        ...state,
        searchSuggest: payload
      }
    },
    recPlaylist(state, {payload}) {
      return {
        ...state,
        home: {
          ...state.home,
          playlist: payload
        },
      }
    },
    recNewSong(state, {payload}) {
      return {
        ...state,
        home: {
          ...state.home,
          newSong: payload
        },
      }
    },
    recMv(state, {payload}) {
      return {
        ...state,
        home: {
          ...state.home,
          mv: payload
        },
      }
    },
    recDj(state, {payload}) {
      return {
        ...state,
        home: {
          ...state.home,
          dj: payload
        },
      }
    },
    recNewAlbum(state, {payload}) {
      return {
        ...state,
        home: {
          ...state.home,
          newAlbum: payload
        },
      }
    },
    album(state, {payload}) {
      return {
        ...state,
        album: {
          ...state.album,
          songs: payload.songs,
          album: payload.album,
        }
      }
    },
    song(state, {payload}){
      return {
        ...state,
        song: payload,
      }
    },
    topListId(state, {payload}) {
      return {
        ...state,
        topListId: payload
      }
    },
    topListDesc(state, {payload}) {
      return {
        ...state,
        topListDesc: payload
      }
    },
    toplist(state, {payload}) {
      return {
        ...state,
        toplist: payload
      }
    },
    toplistDetail(state, {payload}) {
      const {id, name, coverImgUrl, description, trackCount, playCount} = payload;
      const topListDesc = {id, name, coverImgUrl, description, trackCount, playCount};
      const tracks = payload.tracks;
      return {
        ...state,
        topListDesc:payload,
        songlist: tracks
      }
    },
    topArtistList(state, {payload}) {
      return {
        ...state,
        topArtistList: payload,
      }
    },
    artistDetail(state, {payload}) {
      return {
        ...state,
        artistDetail: payload,
      }
    },
    artistMV(state, {payload}) {
      return {
        ...state,
        artistMV: payload,
      }
    },
    mvDetail(state, {payload}) {
      return {
        ...state,
        mvDetail: payload,
      }
    },
    songDetail(state, {payload}) {
      localStorage.setItem('songDetail', JSON.stringify(payload));
      return {
        ...state,
        player: {
          ...state.player,
          songDetail: payload
        }
      }
    },
    addToPlaylist(state, {payload}) {
      let _playlist = [...state.player.playlist, payload];
      let playlist = dumplicateRemoveArr(_playlist);
      // const playlist = Array.from(new Set([...state.player.playlist, payload]));// 数组去重Array.from(new Set(arr))
      localStorage.setItem('_PLAYLIST', JSON.stringify(playlist));
      return {
        ...state,
        player: {
          ...state.player,
          playlist,
        }
      }
    },
    canPlay(state, {payload}) {
      return {
        ...state,
        isCanPlay: payload,
      }
    },
    playerPlay(state) {
      let player = {...state.player, isPlay: !state.player.isPlay};
      return {
        ...state,
        player
      }
    },
    playerPrev(state) {
      let {playlist, currentSongId, loopType} = state.player;
      let currentIndex = null;
      let currentSongUrl = null;
      if (currentSongId && playlist.length > 0) {
        // 根据循环类型决定下一首歌曲的url
        if (loopType === 0 || loopType === 1) {
          //单曲循环 或 循环
          playlist.forEach((item, index) => {
            if (item.id === currentSongId) {
              currentIndex = index;
            }
          });
          currentSongId = currentIndex - 1 >= 0 ? playlist[currentIndex - 1].id : playlist[playlist.length - 1].id;
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongId = playlist[nextIndex].id;
        }
        currentSongUrl = `http://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`;
      }
      let player = {...state.player, currentSongUrl, currentSongId};
      return {
        ...state,
        player
      };
    },
    playerNext(state) {
      let {playlist, currentSongId, loopType} = state.player;
      let currentIndex = null;
      let currentSongUrl = null;
      if (currentSongId && playlist.length > 0) {
        // 根据循环类型决定下一首歌曲的url
        if (loopType === 0 || loopType === 1) {
          //单曲循环 或 循环
          playlist.forEach((item, index) => {
            if (item.id === currentSongId) {
              currentIndex = index;
            }
          });
          currentSongId = currentIndex + 1 >= playlist.length ? playlist[0].id : playlist[currentIndex + 1].id;
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongId = playlist[nextIndex].id;
        }
        currentSongUrl = `http://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`;
      }
      let player = {...state.player, currentSongUrl, currentSongId};
      return {
        ...state,
        player
      };
    },
    loop(state) {
      let loopType = state.player.loopType + 1 > 2 ? 0 : state.player.loopType + 1;
      return {
        ...state,
        player: {
          ...state.player,
          loopType
        }
      }
    },
    ended(state) {
      return {
        ...state,
        player: {
          ...state.player,
          ended: true,
        }
      }
    },
    lyric(state, {payload}) {
      return {
        ...state,
        player: {
          ...state.player,
          lyric: payload
        }
      }
    },
    setCurrentSong(state, {payload}) {
      localStorage.setItem('currentSongId', payload);

      localStorage.setItem('currentSongUrl', `http://music.163.com/song/media/outer/url?id=${payload}.mp3`);
      return {
        ...state,
        player: {
          ...state.player,
          currentSongId: payload,
          currentSongUrl: `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
        }
      }
    },
    play(state) {
      return {
        ...state,
        player: {
          ...state.player,
          isPlay: true,
        }
      }
    },
    pause(state) {
      return {
        ...state,
        player: {
          ...state.player,
          isPlay: false,
        }
      }
    },
    addAllToPlaylist(state, {payload}) {
      let playlist = dumplicateRemoveArr([
        ...state.player.playlist,
        ...payload
      ]);
      localStorage.setItem('_PLAYLIST', JSON.stringify(playlist));
      return {
        ...state,
        player: {
          ...state.player,
          playlist,
        }
      };
    },
    playlistDel(state, {payload}) {
      let playlist = state.player.playlist.filter(item => item.id !== payload);
      localStorage.setItem('_PLAYLIST', JSON.stringify(playlist));
      return {
        ...state,
        player: {
          ...state.player,
          playlist,
        }
      }
    }
  },
  effects: {
    * fetchBanner({payload}, {call, put}) {
      let result = yield call(getBanner);
      let banner = result.data.banners;
      yield put({
        type: 'banner',
        payload: banner,
      })
    },
    * fetchSearch({payload}, {call, put}){
      let result = yield call(getSearch, payload);
      let search = result.data.result;
      yield put({
        type: 'search',
        payload: search,
      })
    },
    * fetchSearchSuggest({payload}, {call, put}){
      let result = yield call(getSearchSuggest, payload);
      console.log(666, result)
      let searchSuggest = result.data.result;
      console.log(777,searchSuggest )
      yield put({
        type: 'searchSuggest',
        payload: searchSuggest,
      })
    },
    * fetchRecPlaylist({payload}, {call, put}) {
      let result = yield call(getRecPlaylist);
      let playlist = result.data.result;
      yield put({
        type: 'recPlaylist',
        payload: playlist,
      })
    },
    * fetchRecNewSong({payload}, {call, put}) {
      let result = yield call(getRecNewSong);
      let newSong = result.data.result;
      yield put({
        type: 'recNewSong',
        payload: newSong,
      })
    },
    * fetchRecMv({payload}, {call, put}) {
      let result = yield call(getRecMv);
      let mv = result.data.result;
      yield put({
        type: 'recMv',
        payload: mv,
      })
    },
    * fetchRecDj({payload}, {call, put}) {
      let result = yield call(getRecDj);
      let dj = result.data.result;
      yield put({
        type: 'recDj',
        payload: dj,
      })
    },
    * fetchRecNewAlbum({payload}, {call, put}) {
      let result = yield call(getRecNewAlbum);
      let newAlbum = result.data.albums;
      yield put({
        type: 'recNewAlbum',
        payload: newAlbum,
      })
    },
    * fetchAlbum({payload}, {call, put}) {
      let result = yield call(getAlbum, payload);
      let album = result.data;
      console.log(333, album.album)
      yield put({
        type: 'album',
        payload: album,
      })
    },
    * fetchSong({payload}, {call, put}) {
      let songDetail = yield call(getSongDetail, payload);
      songDetail = songDetail.data.songs[0];
      let songLyric = yield call(getLyric, payload);
      songLyric = formatLyric(songLyric.data.lrc.lyric);
      const song = {songDetail,songLyric};
      yield put({
        type: 'song',
        payload: song,
      })
    },
    * fetchTopArtistList({payload}, {call, put}) {
      let result = yield call(getTopArtistList);
      let topArtistList = result.data.list.artists;
      yield put({
        type: 'topArtistList',
        payload: topArtistList,
      })
    },
    * fetchToplist({payload}, {call, put}) {
      let callArr = [];
      for (let i = 0; i < 24; i++) {
        callArr.push(call(getToplist, i));
      }
      let result = yield callArr;
      let toplist = result.map(item => {
        let {id, name, playCount, coverImgUrl, tracks} = item.data.playlist;
        tracks = tracks.slice(0, 3);
        return {id, name, playCount, coverImgUrl, tracks}
      });
      yield put({
        type: 'toplist',
        payload: toplist
      })
    },
    * fetchPlaylist({payload}, {call, put}) {
      const result = yield call(getPlaylistDetail, payload);
      yield put({
        type: 'toplistDetail',
        payload: result.data.playlist,
      });
    },
    * fetchArtistDetail({payload}, {call, put}) {
      const result = yield call(getArtistDetail, payload);
      const {albumSize, alias, briefDesc, id, img1v1Url, musicSize, mvSize, name, picUrl} = result.data.artist;
      const artist = {albumSize, alias, briefDesc, id, img1v1Url, musicSize, mvSize, name, picUrl};
      const songs = result.data.hotSongs;
      let hotSongs = songs.map(item => {
        let id, name, fee, dt, arName, arId, alName, alId, picUrl, mv;
        id = item.id;
        name = item.name;
        fee = item.fee;
        dt = item.dt;
        mv = item.mv;
        picUrl = item.al.picUrl;
        arName = item.ar[0].name;
        arId = item.ar[0].id;
        alName = item.al.name;
        alId = item.al.id;
        return {
          id, name, fee, dt, arName, arId, alName, alId, picUrl, mv
        }
      });
      yield put({
        type: 'artistDetail',
        payload: {artist, hotSongs: songs},
      });
    },
    * fetchArtistMV({payload}, {call, put}) {
      const result = yield call(getArtistMV, payload);
      yield put({
        type: 'artistMV',
        payload: result.data.mvs,
      });
    },
    * fetchMvDetail({payload}, {call, put}) {
      const result = yield call(getMvDetail, payload);
      yield put({
        type: 'mvDetail',
        payload: result.data.data,
      })
    },
    * fetchCanPlay({payload}, {call, put}){
      const result = yield call(getCheckMusic, payload);
      yield put({
        type: 'canPlay',
        payload: result.data.success,
      })
    },
    * fetchMusicUrl({payload},{call,put}){
      const result = yield put(getMusicUrl, payload);
      let musicUrl = result.data.data[0].url;
      console.log('musicUrl:', musicUrl)
    },
    * fetchLyric({payload}, {call, put, select}) {
      let currentSongId = null;
      yield select(state => {
        currentSongId = state.music.player.currentSongId;
      })
      const result = yield call(getLyric, currentSongId);
      let lyric = result.data.lrc.lyric;
      console.log('歌词', lyric);
      lyric = formatLyric(lyric);
      yield put({
        type: 'lyric',
        payload: lyric,
      });
    },
    * fetchSongDetail({payload}, {call, put}) {
      const result = yield call(getSongDetail, payload);
      const song = result.data.songs[0];
      let musicUrl =  yield call(getMusicUrl, payload);
      // musicUrl = musicUrl.data.data[0].url;
      console.log(333,musicUrl)
      let songDetail = {
        id: song.id,
        url: `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
        songName: song.name,
        singer: song.ar[0].name,
        singerId: song.ar[0].id,
        picUrl: song.al.picUrl,
        alId: song.al.id,
        alName: song.al.name,
        dt: song.dt,
        copyright: song.copyright,
      };
      yield put({
        type: 'songDetail',
        payload: songDetail
      });
      yield put({
        type: 'fetchLyric',
        payload
      });
    },
    * fetchAddToPlaylist({payload}, {call, put}) { // 添加到播放列表
      // 1.根据该歌曲id，
      // 2.查询该 {歌曲url 歌曲ID，歌手名字，歌手ID，歌曲时长}
      // 3.添加到state.playlist
      const result = yield call(getSongDetail, payload);
      const song = result.data.songs[0];
      const songDetail = {
        id: song.id,
        url: `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
        songName: song.name,
        singer: song.ar[0].name,
        singerId: song.ar[0].id,
        picUrl: song.al.picUrl,
        alId: song.al.id,
        alName: song.al.name,
        dt: song.dt,
        copyright: song.copyright,
      };
      yield put({
        type: 'addToPlaylist',
        payload: songDetail,
      })
    },
    * fetchPlayAdd({payload}, {call, put}) { //播放并添加到列表
      yield put({
        type: 'setCurrentSong',
        payload,
      });
      yield put({
        type: 'fetchSongDetail',
        payload,
      });
      yield put({
        type: 'play',
        payload,
      });
      yield put({
        type: 'fetchAddToPlaylist',
        payload,
      });
    },
    * fetchPlayerPlay({payload}, {call, put, select}) {
      yield put({
        type: 'fetchSongDetail',
        payload: localStorage.getItem('currentSongId'),
      });
      yield put({
        type: 'playerPlay',
      })
    },
    * fetchPlayerPrev({payload}, {call, put, select}) {
      yield put({
        type: 'pause',
      });
      yield put({
        type: 'playerPrev',
      });
      let currentSongId = null;
      yield select(state => {
        currentSongId = state.music.player.currentSongId;
      });
      yield put({
        type: 'setCurrentSong',
        payload: currentSongId,
      });
      yield put({
        type: 'fetchSongDetail',
        payload: currentSongId
      });
      yield put({
        type: 'play',
      })
    },
    * fetchPlayerNext({payload}, {call, put, select}) {
      yield put({
        type: 'pause',
      });
      yield put({
        type: 'playerNext',
      });
      let currentSongId = null;
      yield select(state => {
        currentSongId = state.music.player.currentSongId;
      });
      yield put({
        type: 'setCurrentSong',
        payload: currentSongId,
      });
      yield put({
        type: 'fetchSongDetail',
        payload: currentSongId,
      });
      yield put({
        type: 'play',
      })
    },
    * fetchPlayerEnded({payload}, {call, put, select}) {
      yield put({
        type: 'pause',
      });
      let loopType = null;
      yield select(state => {
        loopType = state.music.player.loopType;
      });
      if (loopType === 0) {
        let currentSongId = null;
        yield select(state => {
          currentSongId = state.music.player.currentSongId;
        });
        yield put({
          type: 'fetchSongDetail',
          payload: currentSongId
        });
        yield put({
          type: 'play',
        });
      } else {
        yield put({
          type: 'fetchPlayerNext'
        });
      }
    },
    * fetchPlaylistPlay({payload}, {call, put}) {  // 从播放列表播放
      yield put({
        type: 'setCurrentSong',
        payload,
      });
      yield put({
        type: 'fetchSongDetail',
        payload: payload
      });
      yield put({
        type: 'play',
      });
    },
    * playAll({payload}, {call, put, takeEvery, select}) {
      // 1.根据歌单id查询歌曲列表
      // 2.遍历列表根据每个id 添加到播放列表(添加前需要检查音乐是否可播放)
      // 3.将播放列表第一项id设为当前播放歌曲
      // 4.获取歌曲详情
      // 5.播放
      let result = yield  call(getPlaylistDetail, payload);
      let tracks = result.data.playlist.tracks;
      tracks = tracks.map(song => {
        const songItem = {
          id: song.id,
          url: `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
          songName: song.name,
          singer: song.ar[0].name,
          singerId: song.ar[0].id,
          picUrl: song.al.picUrl,
          alId: song.al.id,
          alName: song.al.name,
          dt: song.dt
        };
        return songItem;
      });
      yield put({
        type: 'addAllToPlaylist',
        payload: tracks,
      });
      let currentSongId = tracks[0].id;
      yield put({
        type: 'setCurrentSong',
        payload: currentSongId,
      });
      yield put({
        type: 'fetchSongDetail',
        payload: currentSongId
      });
      let canPlay = yield call(getCheckMusic, currentSongId);
      console.log(1, canPlay ? canPlay.data.success : false);
      let isCanPlay = canPlay ? canPlay.data.success : false;
      if(isCanPlay) {
        yield put({
          type: 'play',
        });
      }else {
        yield put({
          type: 'fetchPlayerNext',
        })
      }
    }
  },
  subscriptions: {
    keyboardWatcher({dispatch}) {// 监听键盘事件()=>dispatch({type:xx,payload:xxx})
      key('⌘+up, ctrl+up', () => alert('up'))
    },
    setup({dispatch, history}) {
      history.listen(({pathname, query, params, search}) => {
        if (pathname === '/toplist') {
          dispatch({type: 'fetchToplist'});
        } else if (pathname === '/toplistDetail') {

        } else if (pathname === '/topArtistList') {
          dispatch({type: 'fetchTopArtistList'});
        } else if (pathname === '/artistDetail') {
          // const {id} = queryString.parse(search.split('?')[1]);
          // dispatch({type: 'fetchArtistDetail', payload:id || 3684});
          // dispatch({type: 'fetchArtistMV', payload: id || 3684});
        }
      })
    },
  },
}
