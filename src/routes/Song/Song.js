import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './Song.less';
import {copyText, timestampToTime} from "../../utils/tool";

const SongDetail = ({songDetail, dispatch}) => {
  function handlePlay(id){
    dispatch({
      type:'music/fetchPlayAdd',
      payload: id
    })
  }
  function toArtistDetail(id){
    dispatch(routerRedux.push({
      pathname:'/artistDetail/'+id
    }));
  }
  function toAlbum(id){
    dispatch(routerRedux.push({
      pathname:'/album/'+id
    }));
  }
  return (
    <div className={styles.songDetailWrapper}>
      <img src={songDetail.al && songDetail.al.picUrl} alt=""/>
      <div className={styles.descContainer}>
        <h6>{songDetail.name}</h6>
        <p>歌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手：
          <span onClick={()=>toArtistDetail(songDetail.ar[0].id)}>{songDetail.ar && songDetail.ar[0].name}</span>
        </p>
        <p>所属专辑：
          <span onClick={()=>toAlbum(songDetail.al.id)}>{songDetail.al && songDetail.al.name}</span>
        </p>
        <p>发行时间：
          {timestampToTime(songDetail.publishTime)}
        </p>
        <button className={`iconfont icon-bofang1 ${styles.btnPlayAll}`}
                onClick={() => handlePlay(songDetail.id)}> 播放
        </button>
      </div>
    </div>
  )
}
function copyLyric(songLyric){
  let lyric = '';
  if(songLyric && songLyric.length>0){
    songLyric.forEach(item=>lyric+= ' \n '+ item.text);
    copyText(lyric)
  }
}
const Lyric = ({songLyric}) => {
  return (
    <div className={styles.lyricWrapper}>
      <p>
        歌词
        <i className={`iconfont icon-copy ${styles.iconCopy}`}
           onClick={()=>copyLyric(songLyric)}></i>
      </p>
      {
        songLyric && songLyric.length>0 && songLyric.map((item,index) => (
          <div key={index}>
            {item.text}
          </div>
        ))
      }
    </div>
  )
}

class Song extends React.Component{
  constructor(props) {
    super(props);
    this.fetchSong = this.fetchSong.bind(this);
  }
  fetchSong(id){
    this.props.dispatch({type: 'music/fetchSong', payload:id});
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchSong(id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id!==nextProps.match.params.id){
      this.fetchSong(nextProps.match.params.id);
    }
  }
  render(){
    return(
      <div className={styles.container}>
        <SongDetail songDetail={this.props.song.songDetail} dispatch={this.props.dispatch}/>
        <Lyric      songLyric={this.props.song.songLyric}   dispatch={this.props.dispatch}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    song: state.music.song,
  }
}

export default connect(mapStateToProps)(Song);
