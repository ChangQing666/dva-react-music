import React from 'react';
import { Slider } from 'antd';
import styles from './Player.css';
import formatTime from '../../../utils/formatTime';

class Volume extends React.Component{
  constructor(props){
    super(props);
    this.state={isShow: false}
  }
  handleShow =()=>this.setState({isShow:!this.state.isShow});
  render(){
    return (
      <div className={styles.volumeContainer}>
        <i
          onClick={this.handleShow}
          className={`iconfont ${this.props.volume==0 ? 'icon-jingyin' : 'icon-shengyin'} ${styles.shengyin}`} style={{color:'#fff'}}></i>
        {
          this.state.isShow ? (
                              <div className={styles.slider}>
                                <Slider tipFormatter={null} vertical defaultValue={this.props.volume} max={1} min={0} step={0.01} onChange={this.props.volumeChange} />
                              </div>)
                            : null
        }
      </div>
    )
  }
}
class Loop extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let loopClass = null;
    switch(this.props.loopType){
      case 0:
        loopClass = 'icon-danquxunhuan';
        break;
      case 1:
        loopClass = 'icon-xunhuan';
        break;
      case 2:
        loopClass = 'icon-suijibofang';
        break;
    }
    return(
        <i onClick={this.props.onPlayLoop} className={`${styles.loop} iconfont  ${loopClass}`}></i>
    )
  }
}
class Player extends React.Component{
  constructor(props){
    super(props);
    this.onEnded = this.onEnded.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.state = {
      currentTime: 0,
      duration: 0,
      percent: 0,
      volume: 0.5
    }
  }
  handlePlay(){
    if(this.props.player.isPlay){
      this.player.play();
    }else{
      this.player.pause();
    }
  }
  handleVolumeChange(volume){
    this.setState({volume});
    this.player.volume=volume;
  }
  onTimeUpdate(e){
    // let currentTime = e.target.currentTime;
  }
  onEnded(){
    console.log('播放已暂停。。。')
  }
  componentDidUpdate(){
    this.handlePlay();
  }
  componentDidMount(){
    const _player = this.player;
    setInterval(()=>{
      this.setState({
        currentTime: _player.currentTime,
        percent: _player.currentTime*100/(this.props.player.songDetail.dt/1000)
      })
    },1000)
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
              <Slider className={styles.progress} value={this.state.percent||0} />
              <div className={styles.dt}>{ formatTime(this.state.currentTime) + '/ ' + formatTime(this.props.player.songDetail.dt/1000)}</div>
            </div>
          </div>
          <Volume volume={this.state.volume} volumeChange={this.handleVolumeChange}/>
          <Loop loopType={this.props.player.loopType} onPlayLoop={this.props.onPlayLoop}/>
        </div>
        <audio ref={player=>this.player=player}
               onEnded={this.onEnded}
               onTimeUpdate={this.onTimeUpdate}
               src={this.props.player.currentSongUrl}
               controls="controls">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    )
  }
}
export default Player;
