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
  return(
    <div className={styles.container}>
      <TopListDesc topListDesc={topListDesc} onPlayAll={handlePlayAll}/>
      <Songlist dispatch={dispatch} songlist={songlist}/>
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
