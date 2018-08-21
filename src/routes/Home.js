import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
// import {playlistWrapper,ant_carousel,playlistCarousel,playlistItem, cover,mask,icon_play,name,playcount} from './Home.less';
import './Home.less';
import {Carousel} from 'antd'
const RecPlaylist = ({dispatch, recPlaylist}) => {
  let list = null;
  list = recPlaylist.map((item, index) => {
    return (
      <div className={playlistItem} key={index}>
        <div className={cover}>
          <img src={item.picUrl} alt=""/>
          <i className={mask}></i>
          <i className={icon_play} onClick={()=>alert(item.picUrl)}></i>
        </div>
        <div className={name}>{item.name}</div>
        <div className={playcount}>{item.playCount}</div>
      </div>
    )
  })
  return (
    <div className={playlistWrapper}>
      <Carousel effect="fade"
                slidesToShow={5}
                dots={true}
                slidesToScroll={5}
                autoplay={true}
                className={ant_carousel}>
        {
          recPlaylist.map((item, index) => {
            return (
              <div className={playlistItem} key={index}>
                <div className={cover}>
                  <img src={item.picUrl} alt=""/>
                  <i className={mask}></i>
                  <i className={icon_play} onClick={()=>alert(item.picUrl)}></i>
                </div>
                <div className={name}>{item.name}</div>
                <div className={playcount}>{item.playCount}</div>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )
}

const RecNewAlbum = ({recNewAlbum}) => {
  return (
    <div>

    </div>
  )
}
const RecNewSong = ({recNewSong}) => {
  return (
    <div>

    </div>
  )
}
const RecMv = ({recMv}) => {
  return (
    <div>

    </div>
  )
}
const RecDj = ({recDj}) => {
  return (
    <div>

    </div>
  )
}

class Home extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch({
      type:'music/fetchRecPlaylist'
    })
  }
  render(){
    return (
      <>
        <div className={styles.container}>
          <RecPlaylist recPlaylist={this.props.home.playlist}/>
        </div>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    home     : state.music.home,
  }
}

export default connect(mapStateToProps)(Home);
