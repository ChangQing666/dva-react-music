import React from 'react';
import {connect} from 'dva';
import TopListDesc from '../components/music/topList/TopListDesc';
import Songlist from '../components/music/songlist/Songlist';
import Player from '../components/music/player/Player';

const MusicPage = ({dispatch, topListDesc, songlist, player}) => {
  function handleClickTopList(){
    let id = 0;
    dispatch({
      type: 'music/topListId',
      payload: id
    })
  }
  function handleFetchTopList(){
    dispatch({
      type: 'music/fetchTopList',
      payload: 0
    })
  }
  function handlePlayAll(){
    alert('播放全部')
  }
  function handlePlay(id){
    dispatch({
      type: 'music/fetchSongDetail',
      payload: id
    });
  }
  function handlePlayerPlay(){
    dispatch({
      type:'music/playerPlay'
    })
  }
  function handlePlayerPrev(){
    dispatch({
      type:'music/fetchPlayerPrev'
    })
  }
  function handlePlayerNext(){
    dispatch({
      type:'music/fetchPlayerNext'
    })
  }
  function handlePlayerLoop(){
    dispatch({
     type:'music/loop',
    })
  }
  function handlePlayerEnded(){
    console.log('music/playerEnded');
    dispatch({
      type:'music/playerEnded',
    })
  }

  function handlePlayAdd(id){
    dispatch({
      type:'music/fetchPlayAdd',
      payload: id
    })
  }
  function handleAddToPlaylist(id){
    dispatch({
      type:'music/fetchAddToPlaylist',
      payload: id
    })
  }

  return(
    <>
      <TopListDesc topListDesc={topListDesc} onPlayAll={handlePlayAll}/>
      <div>
        <button onClick={handleClickTopList}>点击获取id</button>
        <button onClick={handleFetchTopList}>点击获取列表</button>
      </div>
      <Songlist songlist={songlist} onPlay={handlePlay} onPlayAdd={handlePlayAdd} onAddToPlaylist={handleAddToPlaylist}/>
      <Player player={player}
              onPlay={handlePlayerPlay}
              onPlayPrev={handlePlayerPrev}
              onPlayNext={handlePlayerNext}
              onPlayLoop={handlePlayerLoop}
              onPlayEnded={handlePlayerEnded}
       />

    </>
  )
}

function mapStateToProps(state){
  return {
    topListDesc: state.music.topListDesc,
    songlist: state.music.songlist,
    player: state.music.player
  }
}

export default connect(mapStateToProps)(MusicPage);
