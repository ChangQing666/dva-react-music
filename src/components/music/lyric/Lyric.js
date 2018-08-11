import React from 'react';
import styles from './Lyric.css';

class Lyric extends React.Component{
  constructor(props){
    super(props);
    this.state={scrollTop: 100};
  }
  componentDidUpdate(){
    // 目标位置200
    // 高亮行距离0的距离
    // 每行高度30
    let N = this.props.lyricActiveNo;
    let scrollTop=0;
    if(N>2){
      scrollTop=(N-2)*34
    }
    this.container.scrollTop=scrollTop;
  }
  render(){
    let list = null;
    let {lyric, lyricActiveNo} = this.props;
    if(lyric){
      list = lyric.map((item, index) =>{
        return <div className={`${styles.lyricItem} ${index===lyricActiveNo && styles.highlight}`} key={index}>{item.text}</div>
      })
    }
    return(
      <div className={styles.lyricWrapper}>
        <div className={styles.songInfoContainer}>
          <img className={styles.albumPic} src={this.props.songDetail.picUrl}/>
          <div className={styles.songName}>歌曲名：{this.props.songDetail.songName}</div>
          <div className={styles.singerName}>歌手名：{this.props.songDetail.singer}</div>
          <div className={styles.albumName}>专辑名：{this.props.songDetail.alName}</div>
        </div>
        <div ref={container=>this.container=container} className={styles.lyricContainer} >
          {list}
        </div>
      </div>
    )
  }
}
export default Lyric;
