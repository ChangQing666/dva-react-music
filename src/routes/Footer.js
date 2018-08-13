import React from 'react';
import {connect} from 'dva';
import Player from '../components/music/player/Player';

const Footer = ({dispatch, player}) => {
  function handlePlayerPlay() {
    dispatch({
      type: 'music/playerPlay',
    })
  }

  function handlePlayerPrev() {
    dispatch({
      type: 'music/fetchPlayerPrev',
    })
  }

  function handlePlayerNext() {
    dispatch({
      type: 'music/fetchPlayerNext',
    })
  }

  function handlePlayerLoop() {
    dispatch({
      type: 'music/loop',
    })
  }

  function handlePlayerEnded() {
    dispatch({
      type: 'music/fetchPlayerEnded',
    })
  }

  function handlePlaylistPlay(id,copyright) {
    if(copyright>1){
      alert('该歌曲无版权');
    }else{
      dispatch({
        type   : 'music/fetchPlaylistPlay',
        payload: id
      })
    }
  }

  function handleGetLyric() {
    dispatch({
      type: 'music/fetchLyric'
    })
  }

  return (
    <>
      <Player player        ={player}
              onPlay        ={handlePlayerPlay}
              onPlayPrev    ={handlePlayerPrev}
              onPlayNext    ={handlePlayerNext}
              onPlayLoop    ={handlePlayerLoop}
              onPlayEnded   ={handlePlayerEnded}
              onGetLyric    ={handleGetLyric}
              onPlaylistPlay={handlePlaylistPlay}/>
    </>
  )
}

function mapStateToProps(state) {
  return {
    player: state.music.player,
  }
}

export default connect(mapStateToProps)(Footer);
