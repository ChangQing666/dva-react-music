import React from 'react';
import {connect} from 'dva';
import Songlist from '../components/music/songlist/Songlist';
import styles from './Album.less';

const AlbumDesc = ({albumDesc, dispatch}) => {
  function  handlePlayAll(id){
    dispatch({
      type: 'music/playAll',
      payload:id,
    })
  }
  return (
    <div className={styles.descWrapper}>
      <div>
        {/*{albumDesc.artist}*/}
      </div>
      <img src={albumDesc.picUrl} alt=""/>
      <div className={styles.descContainer}>
        <h6>{albumDesc.name}</h6>
        <p>歌手: <span>{false}</span></p>
        <p>发行时间：{albumDesc.publishTime}</p>
        <p>发行公司：{albumDesc.company}</p>
        <div>
          专辑介绍： {albumDesc.description}
        </div>
        <button className={`iconfont icon-bofang1 ${styles.btnPlayAll}`}
                onClick={() => handlePlayAll(albumDesc.id)}> 播放全部
        </button>
      </div>
    </div>
  )
}


class Album extends React.Component{
  constructor(props) {
    super(props);
    this.fetchAlbum = this.fetchAlbum.bind(this);
  }
  fetchAlbum(id){
    this.props.dispatch({type: 'music/fetchAlbum', payload:id});
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchAlbum(id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id!==nextProps.match.params.id){
      this.fetchAlbum(nextProps.match.params.id);
    }
  }
  render(){
    return(
      <div className={styles.container}>
        {/*<div>{JSON.stringify(this.props.album.name)}</div>*/}
        <AlbumDesc albumDesc={this.props.album} dispatch={this.props.dispatch}/>
        <Songlist  songlist={this.props.songs}  dispatch={this.props.dispatch}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    songs: state.music.album.songs,
    album: state.music.album.album,
  }
}

export default connect(mapStateToProps)(Album);
