import {getPlayistDetail, getSongDetail, getLyric} from '../services/musicService';
function formatToSeconds(v){
  var minutes = Number(v.split(':')[0])
  var seconds = Number(v.split(':')[1])
  return minutes*60+seconds
}
function formatLyric(str){
  let arr = str.split('\n');
  let lyric = arr.map(item=>{
    let obj = {};
    let time = formatToSeconds(item.split(']')[0].slice(1));
    obj.time = time;
    obj.text = item.split(']')[1];
    return obj;
  })
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
      currentSongId: null,
      currentSongUrl: null,
      playlist: [],
      loopType: 0,
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
    addToPlaylist(state, {payload}) {
      let currentSongUrl = `http://music.163.com/song/media/outer/url?id=${payload}.mp3`;
      let playlist = Array.from(new Set([...state.player.playlist, currentSongUrl]));// 数组去重Array.from(new Set(arr))

      // 添加到播放列表
      // 1.根据该歌曲id，
      // 2.查询该 {歌曲url 歌曲ID，歌手名字，歌手ID，歌曲时长}
      return {
        ...state,
        player: {
          ...state.player,
          currentSongId: payload,
          currentSongUrl,
          playlist,
          isPlay: true,
        }
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
    playerPlay(state) {
      let player = {...state.player, isPlay: !state.player.isPlay};
      return {
        ...state,
        player
      }
    },
    playerPrev(state) {
      let {playlist, currentSongUrl, loopType} = state.player;
      let currentIndex = null;
      let currentSongId = null;
      if (currentSongUrl && playlist.length > 0) {
        // 根据循环类型决定下一首歌曲的url
        if (loopType === 0) {
          // 单曲循环
          currentSongUrl = currentSongUrl;
        } else if (loopType === 1) {
          //循环
          playlist.map((item, index) => {
            if (item === currentSongUrl) {
              currentIndex = index;
            }
          });
          currentSongUrl = currentIndex - 1 >= 0 ? playlist[currentIndex - 1] : playlist[playlist.length - 1];
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongUrl = playlist[nextIndex];
        }
        currentSongId = Number(currentSongUrl.split('=')[1].split('.')[0]);
      }

      let player = {...state.player, isPlay: true, currentSongUrl, currentSongId};
      return {
        ...state,
        player
      };
    },
    playerNext(state) {
      let {playlist, currentSongUrl, loopType} = state.player;
      let currentIndex = null;
      let currentSongId = null;
      if (currentSongUrl && playlist.length > 0) {
        // 根据循环类型决定下一首歌曲的url
        if (loopType === 0) {
          // 单曲循环
          currentSongUrl = currentSongUrl;
        } else if (loopType === 1) {
          //循环
          playlist.map((item, index) => {
            if (item === currentSongUrl) {
              currentIndex = index;
            }
          });
          currentSongUrl = currentIndex + 1 >= playlist.length ? playlist[0] : playlist[currentIndex + 1];
        } else {
          //随机循环
          let nextIndex = Math.floor(Math.random() * (playlist.length + 1));
          currentSongUrl = playlist[nextIndex];
        }
        currentSongId = Number(currentSongUrl.split('=')[1].split('.')[0]);
      }
      let player = {...state.player, isPlay: true, currentSongUrl, currentSongId};
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
    lyric(state, {payload}){
      return {
        ...state,
        player: {
          ...state.player,
          lyric: payload
        }
      }
    },
    play(state, {payload}) {
      let currentSongUrl = `http://music.163.com/song/media/outer/url?id=${payload}.mp3`;
      return {
        ...state,
        player: {
          isPlay: true,
          currentSondId: payload,
          currentSongUrl,
          playlist: [...state.playlist, currentSongUrl]
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
      console.log('result', result);
      const song = result.data.songs[0];
      let songDetail = {
        songName: song.name,
        singer: song.ar[0].name,
        picUrl: song.al.picUrl,
        dt: song.dt
      };
      yield put({
        type: 'songDetail',
        payload: songDetail
      });
      yield put({
        type: 'addToPlaylist',
        payload
      });
    },
    * addToPlaylist2({payload}, {call, put}){

    },
    * fetchPlayerPrev({payload}, {call, put, select}) {
      yield put({
        type: 'playerPrev',
      });
      let currentSongId = null;
      yield select(state => {
        currentSongId = state.music.player.currentSongId;
      });
      const result = yield call(getSongDetail, currentSongId);
      const song = result.data.songs[0];
      let songDetail = {
        songName: song.name,
        singer: song.ar[0].name,
        picUrl: song.al.picUrl,
        dt: song.dt
      };
      yield put({
        type: 'songDetail',
        payload: songDetail
      });
    },
    * fetchPlayerNext({payload}, {call, put, select}) {
      yield put({
        type: 'playerNext',
      });
      let currentSongId = null;
      yield  select(state => {
        // 此处处理上一首
        currentSongId = state.music.player.currentSongId;
        console.log(12346, state.music.player)
      })
      console.log('上一首点击，当前id', currentSongId);
      const result = yield call(getSongDetail, currentSongId);
      console.log('result', result);
      const song = result.data.songs[0];
      let songDetail = {
        songName: song.name,
        singer: song.ar[0].name,
        picUrl: song.al.picUrl,
        dt: song.dt
      };
      yield put({
        type: 'songDetail',
        payload: songDetail
      });
    },
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
