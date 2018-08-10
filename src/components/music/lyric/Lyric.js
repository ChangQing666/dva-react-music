import React from 'react';
import styles from './Lyric.css';

class Lyric extends React.Component{
  constructor(props){
    super(props);
    this.state={scrollTop: 100};
  }
  // static getDerivedStateFromProps(nextProps, prevState){
  //   return {
  //     scrollTop: nextProps.lyricActiveNo
  //   }
  // }
  componentDidUpdate(){
    // 目标位置200
    // 高亮行距离0的距离
    // 每行高度30
    let N = this.props.lyricActiveNo;
    let scrollTop=0;
    if(N>6){
      scrollTop=(N-6)*30
    }
    this.container.scrollTop=scrollTop;
  }
  render(){
    let list = null;
    let {lyric, lyricActiveNo} = this.props;
    if(lyric){
      list = lyric.map((item, index) =>{
        return <div className={`${styles.lyricItem} ${index===lyricActiveNo && styles.highlight}`} key={index}>{item.text}</div>
      })
    }
    return(
      <div className={styles.lyricContainer}>
        <div ref={container=>this.container=container} className={styles.lyricWrapper} >
          <h1>歌词</h1>
          {list}
        </div>
      </div>
    )
  }
}
export default Lyric;
