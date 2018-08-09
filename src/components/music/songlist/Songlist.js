import React from 'react';
import formatTime from '../../../utils/formatTime'
import styles from './Songlist.css';

const Songlist = ({songlist,onPlay}) => {
  let list = null;
  if(songlist){
    list = songlist.map((item,index)=>
      <div className={styles.songlistItem} key={index}>
        <span onClick={()=>onPlay(item.id)} className={styles.songName}>{item.name}</span>
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
