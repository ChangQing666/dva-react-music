import React from 'react';
import {connect} from 'dva';
import TopListDesc from '../components/music/topList/TopListDesc';
import Songlist from '../components/music/songlist/Songlist';
import styles from './common/index.css';
const ToplistDetail = ({dispatch, topListDesc, songlist}) => {
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
  function handlePlayAdd(id, copyright){
    if(copyright>1){
      alert('该歌曲无版权')
    }else{
      dispatch({
        type:'music/fetchPlayAdd',
        payload: id
      })
    }

  }
  function handleAddToPlaylist(id){
    dispatch({
      type:'music/fetchAddToPlaylist',
      payload: id
    })
  }
  return(
    <div className={styles.container}>
      <TopListDesc topListDesc={topListDesc} onPlayAll={handlePlayAll}/>
      <Songlist songlist={songlist} onPlay={handlePlay} onPlayAdd={handlePlayAdd} onAddToPlaylist={handleAddToPlaylist}/>
    </div>
  )
}

function mapStateToProps(state){
  return {
    topListDesc: state.music.topListDesc,
    songlist   : state.music.songlist,
  }
}

export default connect(mapStateToProps)(ToplistDetail);
