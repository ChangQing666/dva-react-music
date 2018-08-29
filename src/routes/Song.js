import React from 'react';
import {connect} from 'dva';
import Songlist from '../components/music/songlist/Songlist';
import styles from './Song.less';

const Lyric = ({lyric}) => {
  return (
    <div>

    </div>
  )
}

const SongDesc = ({SongDesc, dispatch}) => {
  function  handlePlay(id){
    dispatch({
      type: 'music/play',
      payload:id,
    })
  }
  return (
    <div className={styles.descWrapper}>
      <img src={SongDesc.al.picUrl} alt=""/>
      <div className={styles.descContainer}>
        <h6>{SongDesc.name}</h6>
        <p>歌手: <span>{SongDesc.ar[0].name}</span></p>
        <p>所属专辑：{SongDesc.al.name}</p>

        <button className={`iconfont icon-bofang1 ${styles.btnPlayAll}`}
                onClick={() => handlePlay(SongDesc.id)}> 播放
        </button>
      </div>
      <Lyric/>
    </div>
  )
}


class Song extends React.Component{
  constructor(props) {
    super(props);
    this.fetchAlbum = this.fetchAlbum.bind(this);
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
        <SongDesc songDesc={this.props.song.songDetail} dispatch={this.props.dispatch}/>
        <Lyric  lyrict={this.props.song.songLyric}  dispatch={this.props.dispatch}/>
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
