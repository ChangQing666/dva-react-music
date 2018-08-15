import React from 'react';
import {connect} from 'dva';
import styles from './Carousel.less'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentIndex: 2,
      sliders:[
        {
          id:0,
          picUrl:'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/319680.jpg?max_age=2592000'
        },
        {
          id:1,
          picUrl:'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/320026.jpg?max_age=2592000'
        },
        {
          id:2,
          picUrl:'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/320037.jpg?max_age=2592000'
        },
        {
          id:3,
          picUrl:'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/316605.jpg?max_age=2592000'
        },
        {
          id:4,
          picUrl:'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/318218.jpg?max_age=2592000'
        }
      ]
    }
  }

  handleNext(){
    let currentIndex = ++this.state.currentIndex % this.state.sliders.length;
    this.setState({
      currentIndex,
    })
  }
  handlePrev(){
    let currentIndex = this.state.currentIndex === 0 ? this.state.sliders.length - 1 : this.state.currentIndex - 1;
    this.setState({
      currentIndex,
    })
  }
  render(){
    const slidersData = this.state.sliders;
    const a = (index)=>{
      let next = this.state.currentIndex === (this.state.sliders.length - 1) ? 0 : this.state.currentIndex + 1;
      let prev = this.state.currentIndex === 0 ? this.state.sliders.length - 1 : this.state.currentIndex - 1;
      switch (index) {
        case this.state.currentIndex:
          return styles.active;
        case next:
          return styles.next;
        case prev:
          return styles.prev;
        default:
          return '';
      }
    }


    const sliders = slidersData.map((item, index)=>(
      <div key={index}
          className={
            `${styles.slider}
            ${a(index)}
            `
            }
      style={{backgroundImage:`url(${item.picUrl}`}}>
      </div>
    ))
    return (
        <div className={styles.container}>
          {sliders}

          <div className={styles.btn+' '+styles.btnPrev}
               onClick={()=>this.handlePrev()}>{'<'}</div>
          <div className={styles.btn+' '+styles.btnNext}
               onClick={()=>this.handleNext()}>{'>'}</div>
        </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    player: state.music.player,
  }
}

export default connect(mapStateToProps)(Carousel);
