import React from 'react';
import {connect} from 'dva';
import styles from './Carousel.less'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentIndex: 0,
      sliders:[
        {
          "picUrl": "http://p1.music.126.net/zh5EhDvsP6A3SSeV0O51Xw==/109951163469518960.jpg",
          "url": "https://music.163.com/store/newalbum/detail?id=72300851",
          "targetId": "0",
          "backgroundUrl": "http://p1.music.126.net/Ip_5cq4P570pzRohXSD5yg==/109951163469522861.jpg",
          "targetType": "3000",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/bNytC56ByCsj_feN1Ks26Q==/109951163469387003.jpg",
          "url": "/song?id=1302938992",
          "targetId": "1302938992",
          "backgroundUrl": "http://p1.music.126.net/M3khUMokEJWY-uuxheNweg==/109951163469384565.jpg",
          "targetType": "1",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/KvpoM8SoFTocUJwnDBiEyA==/109951163469619570.jpg",
          "url": "/mv?id=5966485",
          "targetId": "5966485",
          "backgroundUrl": "http://p1.music.126.net/8zWcx6aegypq6TQUllcKCQ==/109951163469611858.jpg",
          "targetType": "1004",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/4J-6FSOCMWQ2ZpYVRqes6g==/109951163464636687.jpg",
          "url": "https://music.163.com/store/newalbum/detail?id=72299893",
          "targetId": "0",
          "backgroundUrl": "http://p1.music.126.net/oyqEYHJ9m2x0aZNj82rvRw==/109951163464636179.jpg",
          "targetType": "3000",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/2nBQ86-C0QIZW5EbMM8Ecw==/109951163469255463.jpg",
          "url": "/song?id=1301574693",
          "targetId": "1301574693",
          "backgroundUrl": "http://p1.music.126.net/L19dTQPcX2Jo6_0xVchFxg==/109951163469257857.jpg",
          "targetType": "1",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/zfBbAqTpRfsxfs1WjBNqCQ==/109951163469258538.jpg",
          "url": "/topic?id=19153000",
          "targetId": "19153000",
          "backgroundUrl": "http://p1.music.126.net/D4XrTzqobIGLi_UFwxC9Eg==/109951163469251871.jpg",
          "targetType": "1005",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/um941mW_PGFFyl01vhN4BQ==/109951163469258041.jpg",
          "url": "https://music.163.com/#/djradio?id=350364089",
          "targetId": "0",
          "backgroundUrl": "http://p1.music.126.net/Xr6KOYk8CLpqG7WM3ICc0A==/109951163469252360.jpg",
          "targetType": "3000",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        },
        {
          "picUrl": "http://p1.music.126.net/NRnQAt7IQgXAJoicNliMYA==/109951163469255190.jpg",
          "url": "http://music.163.com/m/at/yuemuwenju",
          "targetId": "0",
          "backgroundUrl": "http://p1.music.126.net/UuSHm9aqEkR8N62M-Jar3w==/109951163469249411.jpg",
          "targetType": "3000",
          "monitorType": "",
          "monitorImpress": "",
          "monitorClick": ""
        }
      ],
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }
  pause(){
    clearInterval(this.timer);
  }
  handleNext(){
    this.pause();
    let currentIndex = ++this.state.currentIndex % this.state.sliders.length;
    this.setState({currentIndex});
  }
  handlePrev(){
    this.pause();
    let currentIndex = this.state.currentIndex === 0 ? this.state.sliders.length - 1 : this.state.currentIndex - 1;
    this.setState({currentIndex});
  }
  handleDotClick(currentIndex){
    this.pause();
    this.setState({currentIndex});
  }
  componentDidMount(){
    this.timer = setInterval(this.handleNext,4000);
    this.props.dispatch({
      type:'music/fetchBanner'
    });
    // this.setState({
    //   sliders: this.props.banner
    // })
  }
  componentWillUnmount(){
   this.pause();
  }
  render(){
    const slidersData = this.props.banner;
    const setSliderClass = (index)=>{
      let next = this.state.currentIndex === (slidersData.length - 1) ? 0 : this.state.currentIndex + 1;
      let prev = this.state.currentIndex === 0 ? slidersData.length - 1 : this.state.currentIndex - 1;
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
    };

    const sliders = slidersData.map((item, index)=>(
      <div key={index}
           className={`${styles.slider} ${setSliderClass(index)}`}
           style={{backgroundImage:`url(${item.picUrl}`}}>
      </div>
    ));
    const dots = slidersData.map((item, index)=>(<i key={index} onClick={()=>this.handleDotClick(index)}></i>));

    return (
        <div className={styles.container}>
          {sliders}

          {/*<div className={styles.btn+' '+styles.btnPrev}*/}
               {/*onClick={()=>this.handlePrev()}>{'<'}</div>*/}
          {/*<div className={styles.btn+' '+styles.btnNext}*/}
               {/*onClick={()=>this.handleNext()}>{'>'}</div>*/}
          <div className={styles.dotsContainer}>{dots}</div>
        </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    banner: state.music.banner,
  }
}

export default connect(mapStateToProps)(Carousel);
