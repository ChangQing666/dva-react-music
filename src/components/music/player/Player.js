import React from 'react';
import { Progress } from 'antd';
import styles from './Player.css';
import formatDuring from '../../../utils/formatDuring';
class Player extends React.Component{
  constructor(props){
    super(props);
    console.log('props', props)
  }
  handlePlay(){
    const _player = document.getElementById('player');
    if(this.props.player.isPlay){
      _player.play();
    }else{
      _player.pause();
    }
  }
  componentDidUpdate(){
    this.handlePlay();
    console.log('player',this.props.player)
  }
  render(){
    return(
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.controlContainer}>
            <i onClick={this.props.onPlayPrev}
               className={`iconfont icon-shangyishou ${styles.shangyishou}`}>
            </i>
            <i onClick={this.props.onPlay}
               className={
                 `iconfont
                ${!this.props.player.isPlay ? 'icon-bofang ' + styles.bofang : 'icon-zanting '+ styles.zanting}`}>
            </i>
            <i onClick={this.props.onPlayNext}
               className={`iconfont icon-xiayishou ${styles.xiayishou}`}>
            </i>
          </div>
          <div className={styles.durationContainer}>
            <img className={styles.pic} src={this.props.player.songDetail.picUrl} alt=""/>
            <div className={styles.songName}>
              {this.props.player.songDetail.songName}
              <span className={styles.singerName}>{this.props.player.songDetail.singer}</span>
            </div>
            <div className={styles.progressContainer}>
              <Progress className={styles.progress} percent={30} />
              <div className={styles.dt}>00:00{'/ ' + formatDuring(this.props.player.songDetail.dt||0)}</div>
            </div>
          </div>

        </div>

        <audio id='player' src={this.props.player.currentSongUrl} controls="controls">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    )
  }
}
export default Player;
