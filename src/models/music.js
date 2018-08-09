import {getPlayistDetail, getSongDetail, getLyric} from '../services/musicService';
function formatToSeconds(v){
  const minutes = Number(v.split(':')[0]);
  const seconds = Number(v.split(':')[1]);
  return minutes*60+seconds;
}
function formatLyric(str){
  let arr = str.split('\n');
  let lyric = arr.map(item=>{
    let obj = {};
    let time = formatToSeconds(item.split(']')[0].slice(1));
    obj.time = time;
    obj.text = item.split(']')[1];
    return obj;
  });
  return lyric;
}

export default {
  namespace: 'music',
  state: {
    topListId: 0,
    topListDesc: {},
    songlist: '',
    songUrl: '',
    player: {
      isPlay: false,
      ended: false,
      currentSongId: null,
      currentSongUrl: null,
      playlist: [],
      loopType: 1,
      songDetail: {},
      lyric:null,
    }
  },
  reducers: {
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
    topList(state, {payload}) {
      console.log('排行榜列表', payload);
      const {name, coverImgUrl, description, trackCount, playCount} = payload;
      const topListDesc = {name, coverImgUrl, description, trackCount, playCount};
      const tracks = payload.tracks;
      return {
        ...state,
        topListDesc,
        songlist: tracks
      }
    },
    songDetail(state, {payload}) {
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
      let hash = {};
      let playlist = _playlist.reduce(function(item, next) {
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        return item
      }, []);
      // const playlist = Array.from(new Set([...state.player.playlist, payload]));// 数组去重Array.from(new Set(arr))
      return {
        ...state,
        player: {
          ...state.player,
          playlist,
        }
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
       if (loopType === 0||loopType === 1) {
          //单曲循环 或 循环
          playlist.map((item, index) => {
            if (item.id == currentSongId) {
              currentIndex = index;
            }
          });
          currentSongId = currentIndex - 1 >= 0 ? playlist[currentIndex - 1].id : playlist[playlist.length - 1].id;
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongId = playlist[nextIndex].id;
        }
        currentSongUrl =  `http://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`;
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
        if (loopType === 0||loopType === 1) {
          //单曲循环 或 循环
          playlist.map((item, index) => {
            if (item.id == currentSongId) {
              currentIndex = index;
            }
          });
          currentSongId = currentIndex + 1 >= playlist.length ? playlist[0].id : playlist[currentIndex + 1].id;
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongId = playlist[nextIndex].id;
        }
        currentSongUrl =  `http://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`;
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
    ended(state){
      return {
        ...state,
        player: {
          ...state.player,
          ended: true,
        }
      }
    },
    lyric(state, {payload}){
      return {
        ...state,
        player: {
          ...state.player,
          lyric: payload
        }
      }
    },
    setCurrentSong(state, {payload}){
      return {
        ...state,
        player: {
          ...state.player,
          currentSongId: payload,
          currentSongUrl:  `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
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

  },
  effects: {
    * fetchTopList({payload}, {call, put}) {
      const result = yield call(getPlayistDetail, payload);
      yield put({
        type: 'topList',
        payload: result.data.playlist,
      });
    },
    * fetchLyric({payload}, {call, put}){
      const result = yield call(getLyric, payload);
      let lyric = result.data.lrc.lyric;
      lyric = formatLyric(lyric);
      yield put({
        type: 'lyric',
        payload: lyric,
      });
    },
    * fetchSongDetail({payload}, {call, put}) {
      const result = yield call(getSongDetail, payload);
      const song = result.data.songs[0];
      let songDetail = {
        id:       song.id,
        url:      `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
        songName: song.name,
        singer:   song.ar[0].name,
        singerId: song.ar[0].id,
        picUrl:   song.al.picUrl,
        alId:     song.al.id,
        alName:   song.al.name,
        dt:       song.dt
      };
      yield put({
        type: 'songDetail',
        payload: songDetail
      });
    },
    * fetchAddToPlaylist({payload}, {call, put}){ // 添加到播放列表
      // 添加到播放列表
      // 1.根据该歌曲id，
      // 2.查询该 {歌曲url 歌曲ID，歌手名字，歌手ID，歌曲时长}
      // 3.添加到state.playlist
      const result = yield call(getSongDetail, payload);
      const song = result.data.songs[0];
      let songDetail = {
        id:       song.id,
        url:      `http://music.163.com/song/media/outer/url?id=${payload}.mp3`,
        songName: song.name,
        singer:   song.ar[0].name,
        singerId: song.ar[0].id,
        picUrl:   song.al.picUrl,
        alId:     song.al.id,
        alName:   song.al.name,
        dt:       song.dt
      };
      yield put({
        type: 'addToPlaylist',
        payload: songDetail,
      })
    },
    * fetchPlayAdd({payload}, {call, put}){ //播放并添加到列表
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
        type: 'fetchSongDetail',
        payload: currentSongId
      });
      yield put({
        type: 'play',
      })
    },
    * fetchPlayerEnded({call, put, select}){
      yield put({
        type: 'pause',
      });
      let loopType = null;
      yield select(state => {
        loopType = state.music.player.loopType;
      });
      if(loopType === 0){
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
      }else{
        yield put({
          type: 'fetchPlayerNext'
        })
      }
    },
    * fetchPlaylistPlay({payload}, {call, put}){
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
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/music') {
          dispatch({type: 'fetchTopList', payload: 3779629})
        }
      })
    },
  },
}
