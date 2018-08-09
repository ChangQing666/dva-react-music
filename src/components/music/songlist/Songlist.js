import React from 'react';
import formatTime from '../../../utils/formatTime'
import styles from './Songlist.css';

const Songlist = ({songlist, onPlay, onPlayAdd, onAddToPlaylist}) => {
  let list = null;
  if(songlist){
    list = songlist.map((item,index)=>
      <div className={styles.songlistItem} key={index}>
        <span onClick={()=>onPlay(item.id)} className={styles.songName}>{item.name}</span>
        <span onClick={()=>onPlayAdd(item.id)}>播放</span>
        <span onClick={()=>onAddToPlaylist(item.id)}>+</span>
        <a href={`http://music.163.com/song/media/outer/url?id=${item.id}.mp3`} target='_blank'>下载</a>
        <span className={styles.arName}>{item.ar[0].name}</span>
        <span className={styles.alName}>{item.al.name}</span>
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
export default Songlist;
