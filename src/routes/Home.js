import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
import s from './TopArtistList.css';

const RECPLAYLIST = ({recPlaylist}) => {
  const list = null;
  list = recPlaylist.map((item,index) => {
    return (
      <div>
        <div className={cover}>
          <img src={item.picUrl} alt=""/>
          <i className={mask}></i>
          <i className={icon_play} onClick={()=>alert()}></i>
        </div>
        <div className={name}>{item.name}</div>
        <div className={playcount}>{item.playCount}</div>
      </div>
    )
  })
  return (
    <div>

    </div>
  )
}

const RECNEWALBUM = ({recNewAlbum}) => {
  return (
    <div>

    </div>
  )
}
const RECNEWSONG = ({recNewSong}) => {
  return (
    <div>

    </div>
  )
}
const RECMV = ({recMv}) => {
  return (
    <div>

    </div>
  )
}
const RECDJ = ({recDj}) => {
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

  }
  render(){
    return (
      <>
        <div className={styles.container}>

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
