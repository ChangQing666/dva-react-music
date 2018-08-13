import React from 'react';
import {connect} from 'dva';
import styles from './common/index.css';
import s from './TopArtistList.css'

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
