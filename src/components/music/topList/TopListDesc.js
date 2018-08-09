import React from 'react';
import styles from './TopListDesc.css';
const TopListDesc = ({topListDesc,onPlayAll})=>{
  const {name, coverImgUrl, description,  trackCount, playCount} = topListDesc;
  return (
    <div className={styles.container}>
      <img src={coverImgUrl} alt=""/>
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <p className={styles.desc}>简介：<span>{description}</span></p>
        <button className={`iconfont icon-bofang1 ${styles.btnPlayAll}`} onClick={onPlayAll}> 播放全部</button>
        <div className={styles.countBox}>
          <div className={styles.item}>
            <p>歌曲数</p>
            <div>{trackCount}</div>
          </div>
          <div className={styles.item}>
            <p>收听数</p>
            <div> {playCount}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopListDesc;
