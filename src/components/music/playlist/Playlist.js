import React from 'react';
import styles from './Playlist.css';
import {formatTime} from "../../../utils/tool";

const Playlist = ({playlist, onPlaylistPlay}) => {
  let list = null;
  if(playlist){
    list = playlist.map((item,index)=>
      <div className={styles.playlistItem} key={index}>
        <span onClick={()=>onPlaylistPlay(item.id)} className={styles.songName}>{item.songName}</span>
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
