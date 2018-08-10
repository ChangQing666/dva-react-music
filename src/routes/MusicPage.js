import React from 'react';
import {connect} from 'dva';
import TopListDesc from '../components/music/topList/TopListDesc';
import Songlist from '../components/music/songlist/Songlist';
import Player from '../components/music/player/Player';

const MusicPage = ({dispatch, topListDesc, songlist, player}) => {
  function handlePlayAll(id){
    dispatch({
      type: 'music/playAll',
      payload:id,
    })
  }
  function handlePlay(id){
    dispatch({
      type: 'music/fetchSongDetail',
      payload: id,
    });
  }
  function handlePlayerPlay(){
    dispatch({
      type:'music/playerPlay',
    })
  }
  function handlePlayerPrev(){
    dispatch({
      type:'music/fetchPlayerPrev',
    })
  }
  function handlePlayerNext(){
    dispatch({
      type:'music/fetchPlayerNext',
    })
  }
  function handlePlayerLoop(){
    dispatch({
     type:'music/loop',
    })
  }
  function handlePlayerEnded(){
    dispatch({
      type:'music/fetchPlayerEnded',
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
  function handlePlaylistPlay(id){
    dispatch({
      type:'music/fetchPlaylistPlay',
      payload: id
    })
  }
  return(
    <>
      <TopListDesc topListDesc={topListDesc} onPlayAll={handlePlayAll}/>
      <Songlist songlist={songlist} onPlay={handlePlay} onPlayAdd={handlePlayAdd} onAddToPlaylist={handleAddToPlaylist}/>
      <Player player={player}
              onPlay={handlePlayerPlay}
              onPlayPrev={handlePlayerPrev}
              onPlayNext={handlePlayerNext}
              onPlayLoop={handlePlayerLoop}
              onPlayEnded={handlePlayerEnded}
              onPlaylistPlay={handlePlaylistPlay}
       />

    </>
  )
}

function mapStateToProps(state){
  return {
    topListDesc: state.music.topListDesc,
    songlist   : state.music.songlist,
    player     : state.music.player,
  }
}

export default connect(mapStateToProps)(MusicPage);
