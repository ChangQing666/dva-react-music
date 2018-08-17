import React from 'react';
import {connect} from 'dva';
import Player from '../components/music/player/Player';

const Footer = ({dispatch, player}) => {
  function handlePlayerPlay() {
    dispatch({
      type: 'music/fetchPlayerPlay',
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
              dispatch      ={dispatch}/>
    </>
  )
}

function mapStateToProps(state) {
  return {
    player: state.music.player,
  }
}

export default connect(mapStateToProps)(Footer);
