import React from 'react';
import {connect} from 'dva';
import PlaylistDesc from './PlaylistDesc';
import Songlist from '../../components/music/songlist/Songlist';
import styles from './Playlist.less';

class Playlist extends React.Component{
  constructor(props) {
    super(props);
    this.state={isShowMore: false};
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
  handleStretch(){
    this.setState({
      isShowMore:!this.state.isShowMore
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
      <div className={styles.playlistWrapper}>
        <PlaylistDesc topListDesc={this.props.topListDesc} onPlayAll={this.handlePlayAll}/>
        <div className={styles.listWrapper}>
          <div className={styles.listContainer}>
            <Songlist dispatch={this.props.dispatch} songlist={this.props.songlist}/>
          </div>
          <div className={styles.descriptionContainer}>
            <h5>简介</h5>
            <p className={`${this.state.isShowMore?styles.showMore:''}`}>{this.props.topListDesc.description}</p>
            <span onClick={()=>this.handleStretch()}>{this.state.isShowMore?'[收起]':'[展开]'}</span>
          </div>
        </div>
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
