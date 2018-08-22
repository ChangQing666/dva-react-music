import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
import {playlistWrapper,ant_carousel,playlistCarousel,playlistItem, cover,mask,icon_play,name,playcount} from './Home.less';
import Slider from "react-slick";
const RecPlaylist = ({dispatch, recPlaylist}) => {
  return (
    <div className={playlistWrapper}>
      <Slider   dots={true}
                arrows={true}
                slidesToShow={5}
                slidesToScroll={5}
                infinite={true}
                autoplay={true}
                autoplaySpeed={5000}
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
