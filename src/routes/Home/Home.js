import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from '../common/index.css';
import {splitArr} from "../../utils/tool";
import {
  title,
  playlistWrapper,
  ant_carousel,
  playlistCarousel,
  playlistItem,
  cover,
  mask,
  icon_play,
  name,
  playcount,
  newAlbumWrapper,
  newAlbumItemContainer,
  newAlbumItem,
  newAlbum_carousel,
  artists
} from './Home.less';
import Slider from "react-slick";
import RecNewSong from './RecNewSong'


const RecPlaylist = ({dispatch, recPlaylist}) => {
  function toPlaylist(id) {
    dispatch(routerRedux.push({
      pathname: '/playlist/' + id,
    }));
  }

  return (
    <>
      <div className={title}>歌单推荐</div>
      <div className={playlistWrapper}>
        <Slider dots={true}
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
                    <i className={icon_play} onClick={() => toPlaylist(item.id)}></i>
                  </div>
                  <div className={name} onClick={() => toPlaylist(item.id)}>{item.name}</div>
                  <div className={playcount}>播放量：{parseInt(item.playCount / 10000)}万</div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    </>
  )
}

const RecNewAlbum = ({dispatch, recNewAlbum}) => {
  function formatArtistsName(arr) {
    let output = null;
    arr.forEach((item, index) => {
      output = item.name + '/'
    })
    output = output.slice(0, -1);
    return output;
  }

  function toAlbum(id) {
    dispatch(routerRedux.push({
      pathname: '/album/' + id,
    }));
  }
   function toArtistDetail(id) {
    dispatch(routerRedux.push({
      pathname: '/artistDetail/' + id,
    }));
  }

  return (
    <>
      <div className={title}>新碟首发</div>
      <div className={newAlbumWrapper}>
        <Slider dots={true}
                arrows={true}
                slidesToShow={1}
                slidesToScroll={1}
                infinite={true}
                autoplay={true}
                autoplaySpeed={10000}
                className={newAlbum_carousel}>
          {
            splitArr(recNewAlbum, 10).map((item, index) => {
              return (
                <div className={newAlbumItemContainer}  key={index}>
                  {
                    item.map(i =>
                      <div className={newAlbumItem} key={i.id}>
                          <div className={cover}>
                            <img src={i.picUrl} alt=""/>
                            <i className={mask}></i>
                            <i className={icon_play} onClick={() => toAlbum(i.id)}></i>
                          </div>
                          <div className={name} onClick={() => toAlbum(i.id)}>{i.name}</div>
                          <div className={artists} onClick={() => toArtistDetail(i.artist.id)}>{
                            formatArtistsName(i.artists)
                          }</div>
                        </div>
                      )
                  }
                </div>
              )
            })}
        </Slider>
      </div>
    </>

  )
}


const RecMv = ({dispatch, recMv}) => {
  return (
    <div>

    </div>
  )
}
const RecDj = ({dispatch, recDj}) => {
  return (
    <div>

    </div>
  )
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'music/fetchRecPlaylist'
    });
    this.props.dispatch({
      type: 'music/fetchRecNewAlbum'
    });
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <RecNewAlbum recNewAlbum={this.props.home.newAlbum} dispatch={this.props.dispatch}/>
          {this.props.home.newSong && this.props.home.newSong.length>0 && <RecNewSong recNewSong={this.props.home.newSong} dispatch={this.props.dispatch}/>}
          <RecPlaylist recPlaylist={this.props.home.playlist} dispatch={this.props.dispatch}/>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.music.home,
  }
}

export default connect(mapStateToProps)(Home);
