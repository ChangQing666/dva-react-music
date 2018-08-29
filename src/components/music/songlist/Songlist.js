import React from 'react';
import {routerRedux} from 'dva/router'
import styles from './Songlist.css';
import {formatTime} from "../../../utils/tool";

const Songlist = ({songlist,dispatch}) => {
  function onPlay(id){
    dispatch({
      type: 'music/fetchSongDetail',
      payload: id,
    });
  }
  function onPlayAdd(id, copyright){
    if(copyright>1){
      alert('该歌曲无版权')
    }else{
      dispatch({
        type:'music/fetchPlayAdd',
        payload: id
      })
    }
  }
  function onAddToPlaylist(id){
    dispatch({
      type:'music/fetchAddToPlaylist',
      payload: id
    })
  }
  function toSong(id){
    dispatch(routerRedux.push({
      pathname:'/song/'+id
    }));
  }

  let list = null;
  let title =(
    <div className={styles.songlistItem}>
      <span className={styles.songName}>歌曲</span>
      <span className={styles.controlContainer}></span>
      <span className={styles.arName}>歌手</span>
      <span className={styles.alName}>专辑</span>
      <span className={styles.dt}>时长</span>
    </div>);
  if(songlist){
    list = songlist.map((item,index)=>
      <div className={styles.songlistItem} key={index}>
        <span onClick={()=>toSong(item.id)} className={styles.songName}>{item.name}</span>
        <span className={styles.controlContainer}>
          <i onClick={()=>onPlayAdd(item.id, item.copyright)} className={`iconfont icon-play_icon ${styles.play}` }></i>
          <i onClick={()=>onAddToPlaylist(item.id)} className={`iconfont icon-add ${styles.add}` }></i>
          <a className={`iconfont icon-download ${styles.download}`}  href={`http://music.163.com/song/media/outer/url?id=${item.id}.mp3`}  download={item.name}></a>
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
      {title}
      {list}
    </div>
  )
}
export default Songlist;
