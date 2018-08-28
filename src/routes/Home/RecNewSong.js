import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Slider from "react-slick";
import {splitArr,formatTime} from "../../utils/tool";
import styles from './RecNewSong.less';
import {icon_play} from "./Home.less";

class RecNewSong extends React.Component{
  constructor(props){
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.formatArtistsName = this.formatArtistsName.bind(this);
  }
  toAlbum(id) {
   this.props.dispatch(routerRedux.push({
      pathname: '/album/' + id,
    }));
  }
  formatArtistsName(arr) {
    let output = null;
    arr.forEach((item, index) => {
      output = item.name + '/'
    })
    output = output.slice(0, -1);
    return output;
  }
  handlePlay(id){
    this.props.dispatch({
      type:'music/fetchPlayAdd',
      payload: id
    })
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'music/fetchRecNewSong'
    });
  }
  render(){
    return(
      <>
        <div className={styles.title}>新歌首发</div>
        <div className={styles.newSongWrapper}>
          <Slider dots={false}
                  arrows={false}
                  slidesToShow={1}
                  slidesToScroll={1}
                  infinite={false}
                  autoplay={false}
                  className={styles.newSong_carousel}>
            {
              this.props.recNewSong &&  this.props.recNewSong.length>0 && splitArr(this.props.recNewSong, 9).map((item, index) => {
                return (
                  <div className={styles.newSongItemContainer}  key={index}>
                    {
                      item.map(i =>
                        <div className={styles.newSongItem} key={i.id}>
                          <div className={styles.cover}>
                            <img src={i.song.album.picUrl} alt=""/>
                            <i className={styles.mask}></i>
                            <i className={styles.icon_play} onClick={() => alert(i.id)}></i>
                          </div>
                          <div className={styles.name}>
                            <div onClick={()=>this.handlePlay(i.id)}>{i.name}</div>
                            <p>{this.formatArtistsName(i.song.artists)}</p>
                          </div>
                          <div className={styles.duration}>
                            {formatTime(i.song.duration/1000)}
                          </div>
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
}

export default RecNewSong;
