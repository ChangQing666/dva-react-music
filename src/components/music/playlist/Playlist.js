import React from 'react';
import styles from './Playlist.css';
import {formatTime} from "../../../utils/tool";

const Playlist = ({playlist, onPlaylistPlay}) => {
  let list = null;

  if(playlist){
    list = playlist.map((item,index)=>
      <>
        <div className={styles.playlistItem} key={item.id}>
          <img className={styles.playingGif} src="../../../assets/imgs/wave.gif" alt=""/>
          <span className={styles.number}>{index+1}</span>
          <span onClick={()=>onPlaylistPlay(item.id,item.copyright)} className={styles.songName}>{item.songName}</span>
          <span className={styles.singerName} onClick={()=>alert(item.singerId)}>{item.singer}</span>
          <span className={styles.dt}>{formatTime(item.dt/1000)}</span>
        </div>
        <i className={styles.itemLine}></i>
      </>
    )
  }
  return(
    <div className={styles.playlistContainer}>
      <i className={styles.itemLine}></i>
      <div className={styles.playlistItem}>
        <img src="../../../assets/imgs/wave.gif" alt=""/>
        <span className={styles.number}></span>
        <span className={styles.songName}>歌曲</span>
        <span className={styles.singerName}>歌手</span>
        <span className={styles.dt}>时长</span>
      </div>
      <i className={styles.itemLine}></i>
      <div div className={styles.listContent}>
        {list}
      </div>
    </div>
  )
}
export default Playlist;
