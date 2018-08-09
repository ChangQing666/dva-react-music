import React from 'react';
import formatTime from '../../../utils/formatTime'
import styles from './Songlist.css';

const Songlist = ({songlist, onPlay, onPlayAdd, onAddToPlaylist}) => {
  let list = null;
  if(songlist){
    list = songlist.map((item,index)=>
      <div className={styles.songlistItem} key={index}>
        <span onClick={()=>onPlay(item.id)} className={styles.songName}>{item.name}</span>
        <span className={styles.controlContainer}>
          <i onClick={()=>onPlayAdd(item.id)} className={`iconfont icon-play_icon ${styles.play}` }></i>
          <i onClick={()=>onAddToPlaylist(item.id)} className={`iconfont icon-add ${styles.add}` }></i>
          <a className={`iconfont icon-download ${styles.download}`}  href={`http://music.163.com/song/media/outer/url?id=${item.id}.mp3`} target='_blank'></a>
          <i className={`iconfont icon-share ${styles.share}` }></i>
        </span>
        <span className={styles.arName}>{item.ar[0].name}</span>
        <span className={styles.alName}>{item.al.name}</span>
        <span className={styles.dt}>{formatTime(item.dt/1000)}</span>
      </div>
    )
  }
  return(
    <div className={styles.listContainer}>
      <div className={styles.title}>歌曲列表</div>
      {list}
    </div>
  )
}
export default Songlist;
