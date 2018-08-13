import React from 'react';
import {connect} from 'dva';
import styles from './common/index.css';
import s from './ArtistDetail.css'
import Songlist from '../components/music/songlist/Songlist';
const ArtistInfo = ({dispatch, name, id, alias, img1v1Url, briefDesc,musicSize, albumSize, mvSize})=>{
  function handlePlayAll(id){
    alert(id)
    dispatch({
      type: 'music/playAll',
      payload:id,
    })
  }
  return (
    <div className={s.infoWrapper}>
      <img src={img1v1Url} alt=""/>
      <div className={s.infoContainer}>
        <div className={s.title}>
          <span className={s.name}>{name}</span>
          <span>{alias}</span>
        </div>
        <p>{briefDesc}</p>
        <div className={s.sizeContainer}>
          <span>单曲<span className={s.size}>{musicSize}</span></span>
          <span>专辑<span className={s.size}>{albumSize}</span></span>
          <span>MV<span className={s.size}>{mvSize}</span></span>
        </div>
        <div>
          <button  className={`iconfont icon-bofang1 ${s.btnPlayAll}`}
                   onClick={() => handlePlayAll(id)}>播放热门歌曲</button>
        </div>
      </div>
    </div>
  )
}

const Tabs = () => {
  return (
    <ul className={s.tabsWrapper}>
      <li>热门歌曲</li>
      <li>所有专辑</li>
      <li>MV</li>
      <li>相似歌手</li>
    </ul>
  )
}

class ArtistDetail extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {artist, hotSongs} = this.props.artistDetail;
    return(
      <>
        <div className={styles.container}>
          <ArtistInfo dispatch={this.props.dispatch} {...artist}/>
          <Songlist dispatch={this.props.dispatch} songlist={hotSongs}/>
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    artistDetail: state.music.artistDetail,
  }
}

export default connect(mapStateToProps)(ArtistDetail);
