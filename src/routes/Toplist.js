import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import styles from './common/index.css';
import s from './Toplist.css'
const Toplist = ({dispatch, toplist}) => {
  return(
    <>
      <div className={styles.container}>
        <div className={s.title}>排行榜</div>
        <div className={s.toplistWrapper}>
            {
              toplist.map(item=>(
                <div className={s.itemContainer}>
                  <div className={s.picContainer}>
                    <img src={item.coverImgUrl}/>
                    <span>{parseInt(item.playCount/10000)}万</span>
                  </div>
                  <ul>
                    {
                      item.tracks.map((item,index)=>(
                        <li>{index} {item.name} -{item.ar[0].name}</li>
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
