import React from 'react';
import {connect} from 'dva';
import Songlist from '../components/music/songlist/Songlist';
import styles from './common/index.css';

const AlbumDesc = ({albumDesc, dispatch}) => {
  function  handlePlayAll(id){
    dispatch({
      type: 'music/playAll',
      payload:id,
    })
  }
  return (
    <div>

    </div>

  )
}


class Album extends React.Component{
  constructor(props) {
    super(props);
    this.fetchAlbum = this.fetchAlbum.bind(this);
  }
  fetchAlbum(id){
    this.props.dispatch({type: 'music/fetchAlbum', payload:id});
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    this.fetchAlbum(id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id!==nextProps.match.params.id){
      this.fetchAlbum(nextProps.match.params.id);
    }
  }
  render(){
    return(
      <div className={styles.container}>
        <AlbumDesc topListDesc={this.props.album.album}/>
        <Songlist dispatch={this.props.dispatch} songlist={this.props.album.songs}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    album: state.music.album,
  }
}

export default connect(mapStateToProps)(Album);
