import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'
import styles from './Search.less';

const Suggest = ({searchSuggest, dispatch}) => {
  const {songs, artists, playlists, albums, mvs} = searchSuggest;
  function toArtistDetail(id){
    dispatch(routerRedux.push({
      pathname:'/artistDetail/'+id
    }));
  }

  const SongsList = songs && songs.length>0 && songs.map(item=>(
    <div className={styles.item}
         key={item.id}>
      {item.name}-{item.artists[0].name}
    </div>
  ))
  const Songs =
    <>
      <div className={styles.title}>
        <i className={`iconfont icon-music ${styles.iconMusic}`}></i>
        &nbsp;歌曲
      </div>
      {SongsList}
    </>;

  const ArtistsList = artists && artists.length>0 && artists.map(item=>(
    <div className={styles.item}
         key={item.id}
         onClick={()=>toArtistDetail(item.id)}>
      {item.name}
    </div>
  ));
  const  Artists =
    <>
      <div className={styles.title}>
        <i className={`iconfont icon-singer ${styles.iconSinger}`}></i>
        &nbsp;歌手
      </div>
      {ArtistsList}
    </>;

  const AlbumsList = albums && albums.length>0 && albums.map(item=>(
    <div className={styles.item}
         key={item.id}>
      {item.name}-{item.artist.name}
    </div>
  ));
  const Albums =
    <>
      <div className={styles.title}>
        <i className={`iconfont icon-album ${styles.iconAlbum}`}></i>
        &nbsp;专辑
      </div>
      { AlbumsList}
    </>;

  const MvsList = mvs && mvs.length>0 && mvs.map(item=>(
    <div className={styles.item}
         key={item.id}>
      {item.name}-{item.artistName}
    </div>
  ));
  const Mvs =
    <>
      <div className={styles.title}>
        <i className={`iconfont icon-MV ${styles.iconMV}`}></i>
        &nbsp;MV
      </div>
      { MvsList}
    </>;

  return(
    <div className={styles.suggestWrapper}>
     {Songs}
     {Artists}
     {Albums}
     {Mvs}
    </div>
  )
}

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowSuggest: false
    };
    this.fetchSearchSuggest = this.fetchSearchSuggest.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  fetchSearchSuggest(){
    const keyword = this.input.value.trim();
    if(keyword){
      this.props.dispatch({type: 'music/fetchSearchSuggest', payload:keyword});
    }
   }
  handleFocus(){
    this.setState({
      isShowSuggest: true
    })
  }
  handleBlur(){
    setTimeout(()=>  this.setState({
      isShowSuggest: false
    }),1000)
  }
  render(){
    return(
      <div className={`${ this.state.isShowSuggest ? styles.container + ' ' +styles.active : styles.container }`}>
        <div className={styles.searchInputWrapper}>
          <input type="text"
                 ref={(input)=>this.input=input}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onInput={this.fetchSearchSuggest}/>
          <i className={`iconfont icon-search ${styles.iconSearch}`}></i>
        </div>
        {this.state.isShowSuggest && <Suggest
          searchSuggest={this.props.searchSuggest}
          dispatch={this.props.dispatch}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    searchSuggest: state.music.searchSuggest,
  }
}

export default connect(mapStateToProps)(Search);
