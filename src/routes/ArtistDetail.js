import React from 'react';
import {connect} from 'dva';
import styles from './common/index.css';
import s from './TopArtistList.css'

class ArtistDetail2 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <>
        <div className={styles.container}>
          {
            // this.props.artist.map(item=><div>{item.name}</div>)
          }
          {/*<div className={s.title}>{this.props.artist[0].dt}</div>*/}
          {/*<div className={s.title}>{JSON.stringify(this.props.artist)}</div>*/}
          {/*<div className={s.toplistWrapper}>*/}
          {/*</div>*/}
        </div>
      </>
    )
  }
}
const ArtistDetail = ({dispatch, artistDetail})=>{
  let list = artistDetail.hotSongs.map(item=>(<div>{item.name}</div>));
  return (
    <>
      <div className={styles.container}>
        <h6>
          {artistDetail.artist.mvSize}
      </h6>
        {
           list
        }
      </div>
    </>)
}
function mapStateToProps(state){
  console.log(123,state);
  return {
    artistDetail     : state.music.artistDetail,
    // artist     : [{name:1},{name:2}],
  }
}

export default connect(mapStateToProps)(ArtistDetail);
