import React from 'react';
import {connect} from 'dva';
import styles from './Search.less';

const Suggest = ({searchSuggest, dispatch}) => {
  const {songs,playlists,albums,artists,mvs} = searchSuggest;
  return(
    <div>

    </div>
  )
}

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.fetchSearchSuggest = this.fetchSearchSuggest.bind(this);
  }
  fetchSearchSuggest(){
    const keyword = this.input.value;
    console.log(keyword)
    this.props.dispatch({type: 'music/fetchSearchSuggest', payload:keyword});
  }

  render(){
    return(
      <div className={styles.container}>
        <div className={styles.searchInputWrapper}>
          <input type="text"
                 ref={(input)=>this.input=input}
                 onInput={this.fetchSearchSuggest}/>
        </div>


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
