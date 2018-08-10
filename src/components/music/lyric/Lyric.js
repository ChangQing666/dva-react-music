import React from 'react';
import styles from './Lyric.css';

const Lyric = ({lyric}) => {
  const list = lyric.map((item, index) =>{
    return <div className={styles.lyricItem+' '} key={index}>{item.text}</div>
  })
  return (
    <div className={styles.lyricContainer}>
      <div className={styles.lyricWrapper}>
        <h1>歌词</h1>
        {list}
      </div>
    </div>
)};

export default Lyric;
