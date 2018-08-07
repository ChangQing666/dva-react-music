import {getPlayistDetail, getSongDetail} from '../services/musicService';
export default{
   namespace: 'music',
   state: {
      topListId: 0,
      topListDesc:{
      },
      playlist:'',
      songUrl:'',
      player:{
        isPlay: false,
        currentSondId: null,
        currentSongUrl: null,
        playlist:[],
        loopType:0,
        songDetail:{},
      }
   },
   reducers: {
     addToPlaylist(state,{payload}){
       let currentSongUrl = `http://music.163.com/song/media/outer/url?id=${payload}.mp3`;
       return {
         ...state,
         player:{
           ...state.player,
           currentSondId: payload,
           currentSongUrl,
           playlist: [...state.player.playlist, currentSongUrl],
           isPlay: true,
         }
       }
     },
     songDetail(state,{payload}){
       console.log(123,payload)
       return{
         ...state,
         player:{
           ...state.player,
           songDetail:payload
         }
       }
     },
     playerPlay(state){
       let player = {...state.player,isPlay:!state.player.isPlay};
       return {
         ...state,
         player
       }
     },
     playerPrev(state){
        let {playlist,currentSongUrl} = state.player;
        let currentIndex = null;
        playlist.map((item,index) => {
          if(item === currentSongUrl){
            currentIndex = index;
          }
        });
        currentSongUrl = currentIndex-1 >=0 ? playlist[currentIndex-1] :playlist[playlist.length-1];
        let player = {...state.player, isPlay:true, currentSongUrl};
        return {
          ...state,
          player
        };
     },
     playerNext(state){
       let {playlist,currentSongUrl} = state.player;
       let currentIndex = null;
       playlist.map((item,index) => {
         if(item === currentSongUrl){
           currentIndex = index;
         }
       });
       currentSongUrl = currentIndex+1 >= playlist.length ? playlist[0] : playlist[currentIndex+1];
       let player = {...state.player, isPlay:true, currentSongUrl};
       return {
         ...state,
         player
       };
     },
     play(state,{payload}){
       let currentSongUrl = `http://music.163.com/song/media/outer/url?id=${payload}.mp3`;
       return {
         ...state,
         player:{
           isPlay: true,
           currentSondId: payload,
           currentSongUrl,
           playlist: [...state.playlist, currentSongUrl]
         }
       }
     },
     topListId(state,{payload}){
       return {
         ...state,
         topListId: payload
       }
     },
     topListDesc(state,{payload}){
       console.log('p', payload)
       return {
         ...state,
         topListDesc: payload
       }
     },
     topList(state,{payload}){
       console.log('排行榜列表', payload);
       const {name, coverImgUrl, description,  trackCount, playCount} = payload;
       const topListDesc = {name, coverImgUrl, description,  trackCount, playCount};
       const tracks = payload.tracks;
       return {
         ...state,
         topListDesc,
         playlist: tracks
       }
     },
   },
   effects: {
     * fetchTopList({payload}, {call, put}){
       const result = yield call(getPlayistDetail, payload);
       yield put({
         type: 'topList',
         payload: result.data.playlist,
       });
     },
     * fetchSongDetail({payload}, {call,put}){
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
     }
   },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/music') {
          dispatch({ type: 'fetchTopList',payload:3779629 })
        }
      })
    },
  },
}
