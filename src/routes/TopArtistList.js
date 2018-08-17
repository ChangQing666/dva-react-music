import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
import s from './TopArtistList.css'
const TopArtistList = ({dispatch, topArtistList}) => {
  function toArtistDetail(id){
    dispatch(routerRedux.push({
      pathname:'/artistDetail/'+id
    }));
  }
  return(
    <>
      <div className={styles.container}>
        <div className={s.title}>歌手榜</div>
        <div className={s.toplistWrapper}>
            {
              topArtistList.map((item)=>(
                <div key={item.id}
                     className={s.itemContainer}
                     onClick={()=>toArtistDetail(item.id)}>

                    <img className={s.pic} src={item.img1v1Url} alt=''/>
                    <div className={s.name}>{item.name}</div>
                </div>
              ))
            }
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state){
  return {
    topArtistList     : state.music.topArtistList,
  }
}

export default connect(mapStateToProps)(TopArtistList);
