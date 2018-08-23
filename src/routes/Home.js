import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
import {playlistWrapper,ant_carousel,playlistCarousel,playlistItem, cover,mask,icon_play,name,playcount} from './Home.less';
import Slider from "react-slick";
const RecPlaylist = ({dispatch, recPlaylist}) => {
  function toPlaylist(id){
    dispatch(routerRedux.push({
      pathname:'/playlist/'+id,
    }));
  }
  return (
    <div className={playlistWrapper}>
      <Slider   dots={true}
                arrows={true}
                slidesToShow={5}
                slidesToScroll={5}
                infinite={true}
                autoplay={true}
                autoplaySpeed={10000000}
                className={ant_carousel}>
        {
          recPlaylist.map((item, index) => {
            return (
              <div className={playlistItem} key={index}>
                <div className={cover}>
                  <img src={item.picUrl} alt=""/>
                  <i className={mask}></i>
                  <i className={icon_play} onClick={()=>toPlaylist(item.id)}></i>
                </div>
                <div className={name}>{item.name}</div>
                <div className={playcount}>播放量：{parseInt(item.playCount/10000)}万</div>
              </div>
            )
          })
        }
      </Slider>
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
          <RecNewAlbum/>
          <RecPlaylist recPlaylist={this.props.home.playlist} dispatch={this.props.dispatch}/>
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
