import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './common/index.css';
import s from './Toplist.css'
const Toplist = ({dispatch, toplist}) => {
  function toToplistDetail(id){
    dispatch(routerRedux.push({
      pathname:'/toplistDetail',
      query:{id},
    }));
  }
  return(
    <>
      <div className={styles.container}>
        <div className={s.title}>排行榜</div>
        <div className={s.toplistWrapper}>
            {
              toplist.map((item,index)=>(
                <div key={item.id}
                     className={s.itemContainer}
                     onClick={()=>toToplistDetail(item.id)}>
                  <div className={s.picContainer}>
                    <img src={item.coverImgUrl}/>
                    <span>{parseInt(item.playCount/10000)}万</span>
                  </div>
                  <ul>
                    {
                      item.tracks.map((item,index)=>(
                        <li key={item.id}>{index}&nbsp;&nbsp; {item.name} -{item.ar[0].name}</li>
                      ))
                    }
                  </ul>
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
    toplist     : state.music.toplist,
  }
}

export default connect(mapStateToProps)(Toplist);
