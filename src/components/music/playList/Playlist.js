import React from 'react';
import formatDuring from '../../../utils/formatDuring'
import styles from './Playlist.css';

const Playlist = ({playlist,onPlay}) => {
  console.log('playlist',typeof formatDuring);

  let list = null;
  if(playlist){
    list = playlist.map((item,index)=>
      <div className={styles.playlistItem} key={index}>
        <span onClick={()=>onPlay(item.id)} className={styles.songName}>{item.name}</span>
        <span className={styles.arName}>{item.ar[0].name}</span>
        <span className={styles.alName}>{item.al.name}</span>
        <span className={styles.dt}>{formatDuring(item.dt)}</span>
      </div>
    )
  }
  return(
    <div>
      {list}
    </div>
  )
}
export default Playlist;
