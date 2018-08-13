import React from 'react';
import {connect} from 'dva';
import styles from './common/index.css';
import s from './ArtistDetail.css'

const ArtistInfo = ({name, id, alias, img1v1Url, briefDesc,musicSize, albumSize, mvSize, onPlayAll})=>{
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
                   onClick={() => onPlayAll(id)}>播放热门歌曲</button>
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

const hotSongs = ({hotSongs}) => {
  return(
    <div></div>
  )
}
class ArtistDetail extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {artist, hotSongs} = this.props.artistDetail;
    let list = hotSongs.map(item=>(<div>{item.name}</div>));
    return(
      <>
        <div className={styles.container}>
          {/*<ArtistInfo name={artist.name} alias={artist.alias} picUrl={artist.picUrl}/>*/}
          <ArtistInfo {...artist}/>
          {list}
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    artistDetail     : state.music.artistDetail,
  }
}

export default connect(mapStateToProps)(ArtistDetail);
