import React from 'react';
import {connect} from 'dva';
import styles from './common/index.css';
import s from './TopArtistList.css'
const ArtistDetail = ({dispatch, artistDetail}) => {
  // let picUrl = artistDetail.artist.picUrl;a
  return(
    <>
      <div className={styles.container}>
        <div className={s.title}>{JSON.stringify(artistDetail)}</div>
        <div className={s.toplistWrapper}>
          {artistDetail.code+"-"+artistDetail.more}
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state){
  return {
    artistDetail     : state.music.artistDetail,
  }
}

export default connect(mapStateToProps)(ArtistDetail);
