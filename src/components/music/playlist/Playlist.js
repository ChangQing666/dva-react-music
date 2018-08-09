import React from 'react';
import formatTime from '../../../utils/formatTime'
import styles from './Playlist.css';

const Playlist = ({playlist,onPlay}) => {
  let list = null;
  if(playlist){
    list = playlist.map((item,index)=>
      <div className={styles.playlistItem} key={index}>
        <span onClick={()=>onPlay(item.id)} className={styles.songName}>{item.songName}</span>
        <span className={styles.arName} onClick={()=>alert(item.singerId)}>{item.singer}</span>
        <span className={styles.dt}>{formatTime(item.dt/1000)}</span>
      </div>
    )
  }
  return(
    <div className={styles.listContainer}>
      {list}
    </div>
  )
}
export default Playlist;
