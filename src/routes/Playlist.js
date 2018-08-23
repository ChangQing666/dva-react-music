import React from 'react';
import {connect} from 'dva';
import TopListDesc from '../components/music/topList/TopListDesc';
import Songlist from '../components/music/songlist/Songlist';
import styles from './common/index.css';

class Playlist extends React.Component{
  constructor(props) {
    super(props);
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
    this.handlePlayAll = this.handlePlayAll.bind(this);
  }
  fetchPlaylist(id){
    this.props.dispatch({type: 'music/fetchPlaylist', payload:id});
  }
  handlePlayAll(id){
    this.props.dispatch({
      type: 'music/playAll',
      payload:id,
    })
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchPlaylist(id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id!==nextProps.match.params.id){
      this.fetchPlaylist(nextProps.match.params.id);
    }
  }
  render(){
    return(
      <div className={styles.container}>
        <TopListDesc topListDesc={this.props.topListDesc} onPlayAll={this.handlePlayAll}/>
        <Songlist dispatch={this.props.dispatch} songlist={this.props.songlist}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    topListDesc: state.music.topListDesc,
    songlist   : state.music.songlist,
  }
}

export default connect(mapStateToProps)(Playlist);
