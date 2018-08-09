import React from 'react';
import {Slider} from 'antd';
import styles from './Player.css';
import formatTime from '../../../utils/formatTime';
import Lyric from '../lyric/Lyric';
import Playlist from '../playlist/Playlist';
function formatToSeconds(v){
  var minutes = Number(v.split(':')[0])
  var seconds = Number(v.split(':')[1])
  return minutes*60+seconds
}
function formatLyric(str){
  let arr = str.split('\n');
  let lyric = arr.map(item=>{
    let obj = {};
    let time = formatToSeconds(item.split(']')[0].slice(1));
    obj.time = time;
    obj.text = item.split(']')[1];
    return obj;
  })
  return lyric;
}
const l = formatLyric( "[00:27.440]窗外的麻雀 在电线杆上多嘴\n[00:34.308]妳说这一句 很有夏天的感觉\n[00:41.298]手中的铅笔 在纸上来来回回\n[00:49.600]我用几行字形容妳是我的谁\n[00:51.998]\n[00:54.289]秋刀鱼 的滋味 猫跟妳都想了解\n[01:01.218]初恋的香味就这样被我们寻回\n[01:07.218]那温暖 的阳光 像刚摘的鲜艳草莓\n[01:14.689]你说妳舍不得吃掉这一种感觉\n[01:19.288]\n[01:21.198]雨下整夜 我的爱溢出就像雨水\n[01:27.158]院子落叶 跟我的思念厚厚一叠\n[01:34.498]几句是非 也无法将我的热情冷却\n[01:41.398]妳出现在我诗的每一页\n[01:45.668]\n[01:47.528]雨下整夜 我的爱溢出就像雨水\n[01:54.118]窗台蝴蝶 像诗里纷飞的美丽章节\n[02:01.198]我接着写 把永远爱妳写进诗的结尾\n[02:07.927]妳是我唯一想要的了解\n[02:12.999]\n[02:42.199]雨下整夜 我的爱溢出就像雨水\n[02:48.219]院子落叶 跟我的思念厚厚一叠\n[02:54.949]几句是非 也无法将我的热情冷却\n[03:02.549]妳出现在我诗的每一页\n[03:08.449]\n[03:09.449]那饱满 的稻穗 幸福了这个季节\n[03:16.489]而妳的脸颊像田里熟透的蕃茄\n[03:22.469]妳突然 对我说 七里香的名字很美\n[03:29.199]我此刻却只想亲吻妳倔强的嘴\n[03:34.979]\n[03:35.979]雨下整夜 我的爱溢出就像雨水\n[03:42.319]院子落叶 跟我的思念厚厚一叠\n[03:48.969]几句是非 也无法将我的热情冷却\n[03:56.459]妳出现在我诗的每一页\n[04:00.479]\n[04:03.269]整夜\n[04:05.129]我的爱溢出就像雨水\n[04:09.399]窗台蝴蝶 像诗里纷飞的美丽章节\n[04:16.199]我接着写 把永远爱妳写进诗的结尾\n[04:23.579]妳是我唯一想要的了解\n[04:29.100]\n[04:59.699]\n")


class Volume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShow: false}
  }

  handleShow = () => this.setState({isShow: !this.state.isShow});

  render() {
    return (
      <div className={styles.volumeContainer}>
        <i
          onClick={this.handleShow}
          className={`iconfont ${this.props.volume == 0 ? 'icon-jingyin' : 'icon-shengyin'} ${styles.shengyin}`}
          style={{color: '#fff'}}></i>
        {
          this.state.isShow ? (
              <div className={styles.slider}>
                <Slider tipFormatter={null}
                        vertical
                        defaultValue={this.props.volume}
                        max={1}
                        min={0}
                        step={0.01}
                        onChange={this.props.volumeChange}/>
              </div>)
            : null
        }
      </div>
    )
  }
}

class Loop extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loopClass = null;
    switch (this.props.loopType) {
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
    return (
      <i onClick={this.props.onPlayLoop} className={`${styles.loop} iconfont  ${loopClass}`}></i>
    )
  }
}

class ListIcon extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
        <i onClick={this.props.onShowPlaylist} className={`${styles.list} iconfont icon-bofangliebiao`}></i>
    )
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.onEnded = this.onEnded.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.handleShowPlaylist = this.handleShowPlaylist.bind(this);
    this.state = {
      currentTime: 0,
      duration: 0,
      percent: 0,
      volume: 0.5,
      isShowPlaylist: false,
    }
  }

  handlePlay() {
    if (this.props.player.isPlay) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleVolumeChange(volume) {
    this.setState({volume});
    this.player.volume = volume;
  }
  handleCurrentTimeChange(v) {
    this.player.currentTime = (v/100)*(this.player.duration);
  }
  onTimeUpdate(e) {
    // let currentTime = e.target.currentTime;
  }
  handleShowPlaylist(){
    this.setState({
      isShowPlaylist: !this.state.isShowPlaylist
    })
  }
  onEnded() {
    console.log('播放已暂停。。。');
  }

  componentDidUpdate() {
    this.handlePlay();
  }

  componentDidMount() {
    const _player = this.player;
    setInterval(() => {
      this.setState({
        currentTime: _player.currentTime,
        percent: _player.currentTime * 100 / (this.props.player.songDetail.dt / 1000)
      })
    }, 1000)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.controlContainer}>
            <i onClick={this.props.onPlayPrev}
               className={`iconfont icon-shangyishou ${styles.shangyishou}`}>
            </i>
            <i onClick={this.props.onPlay}
               className={
                 `iconfont
                ${!this.props.player.isPlay ? 'icon-bofang ' + styles.bofang : 'icon-zanting ' + styles.zanting}`}>
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
              <Slider className={styles.progress}
                      tipFormatter={null}
                      value={this.state.percent || 0}
                      step={1}
                      onChange={this.handleCurrentTimeChange}
              />
              <div
                className={styles.dt}>{formatTime(this.state.currentTime) + '/ ' + formatTime(this.props.player.songDetail.dt / 1000)}</div>
            </div>
          </div>
          <Volume volume={this.state.volume} volumeChange={this.handleVolumeChange}/>
          <Loop loopType={this.props.player.loopType} onPlayLoop={this.props.onPlayLoop}/>
          <ListIcon onShowPlaylist={this.handleShowPlaylist}/>
          {
            this.state.isShowPlaylist &&
            <>
              <Playlist playlist={this.props.player.playlist}
                        onPlaylistPlay={this.props.onPlaylistPlay}
              />
              <Lyric lyric={l} />
            </>
          }
        </div>
        <audio ref={player => this.player = player}
               onEnded={this.props.onPlayEnded}
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
