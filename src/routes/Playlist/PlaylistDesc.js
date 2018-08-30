import React from 'react';
import styles from './PlaylistDesc.less';

const PlaylistDesc = ({topListDesc, onPlayAll}) => {
  return (
    <div className={styles.container}>
      <img src={topListDesc.coverImgUrl} alt=""/>
      <div className={styles.info}>
        <div className={styles.title}>{topListDesc.name}</div>
        <div>
          标&nbsp;&nbsp;&nbsp;&nbsp;签：{
          topListDesc.tags && topListDesc.tags.map(item=><span>{item}</span>)
        }
        </div>
        <div >
          收藏量：{topListDesc.subscribedCount}
        </div>
        <div>
          播放量：{topListDesc.playCount}
        </div>
        <button className={`iconfont icon-bofang1 ${styles.btnPlayAll}`}
                onClick={() => onPlayAll(topListDesc.id)}> 播放全部
        </button>
      </div>
    </div>
  )
}

export default PlaylistDesc;
