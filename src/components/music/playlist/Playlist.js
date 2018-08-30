import React from 'react';
import {routerRedux} from 'dva/router';
import styles from './Playlist.css';
import {formatTime} from "../../../utils/tool";

const Playlist = ({dispatch,currentSongId,toArtistDetail,toSong}) => {
  let list = null;
  let playlist = JSON.parse(localStorage.getItem('_PLAYLIST'));
  function onPlaylistPlay(id,copyright) {
    if(copyright>1){
      alert('该歌曲无版权');
    }else{
      dispatch({
        type   : 'music/fetchPlaylistPlay',
        payload: id
      })
    }
  }

  function onPlaylistDel(id){
    dispatch({
      type:'music/playlistDel',
      payload:id,
    })
  }


  if(playlist){
    list = playlist.map((item,index)=>
      <div key={item.id}>
        <div className={`${currentSongId===item.id ? styles.playingItem + ' ' +styles.playlistItem : styles.playlistItem }`} >
          <img className={styles.playingGif} src="https://y.gtimg.cn/mediastyle/yqq/img/wave.gif" alt=""/>
          <span className={styles.number}>{index+1}</span>
          <span className={styles.songName}
                onClick={()=>toSong(item.id)}>
                {item.songName}
          </span>
          <span className={styles.btnContainer}>
              <i className={`iconfont icon-play_icon ${styles.btnPlay}`}
                 onClick={()=>onPlaylistPlay(item.id,item.copyright)}></i>
              <i className={`iconfont icon-delete ${styles.btnDel}`}
                 onClick={()=>onPlaylistDel(item.id)}></i>
          </span>
          <span className={styles.singerName} onClick={()=>toArtistDetail(item.singerId)}>{item.singer}</span>
          <span className={styles.dt}>{formatTime(item.dt/1000)}</span>
        </div>
        <i className={styles.itemLine}></i>
      </div>
    )
  }else{
    list=null;
  }
  return(
    <div className={styles.playlistContainer}>
      <i className={styles.itemLine}></i>
      <div className={styles.playlistItem}>
        <img src="" alt=""/>
        <span className={styles.number}></span>
        <span className={styles.songName}>歌曲</span>
        <span className={styles.btnContainer}></span>
        <span className={styles.singerName}>歌手</span>
        <span className={styles.dt}>时长</span>
      </div>
      <i className={styles.itemLine}></i>
      <div className={styles.listContent}>
        {list}
      </div>
    </div>
  )
}
export default Playlist;
