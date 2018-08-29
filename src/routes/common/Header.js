import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import Search from './Search'
import styles from './Header.css'
class Header extends React.Component{
  constructor(props){
    super(props);
    const activeNavId = localStorage.getItem('activeNavId') || 0;
    this.state={
      activeNavId,
      navs:[
        {
          name: '首页',
          path:'/',
          id:0,
        },
        {
          name: '排行榜',
          path:'/toplist',
          id:1,
        },
         {
          name: '歌手',
          path:'/topArtistList',
          id:2,
        },
         {
          name: '歌单',
          path:'/toplist',
          id:3,
        },
      ]
    }
    this.handleClickNav = this.handleClickNav.bind(this);
  }
  handleClickNav(id){
    this.setState({
      activeNavId: id,
    },()=>localStorage.setItem('activeNavId',id))
  }
  componentDidMount(){
    const activeNavId = localStorage.getItem('activeNavId');
    this.setState({
      activeNavId
    });
  }
  render(){
    const NavsData = this.state.navs;
    const Navs = NavsData.map((item, index)=>(
      <li key={index}
          onClick={()=>this.handleClickNav(item.id)}
          className={`${styles.navItem} ${this.state.activeNavId == item.id ? styles.navActive : ''}`}>
        <Link to={item.path}>{item.name}</Link>
      </li>
    ));
    return (
      <div className={styles.navWrapper}>
        <ul className={styles.navContainer}>
          {Navs}
          <Search/>
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    player: state.music.player,
  }
}

export default connect(mapStateToProps)(Header);
