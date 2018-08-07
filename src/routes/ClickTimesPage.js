import React from 'react';
import {connect} from 'dva'
const ClickTimesPage = ({times, dispatch}) => {
  return(
    <div>
      <h1>最高纪录：{times.record}</h1>
      <h2>{times.current}</h2>
      <div>
        <button onClick={()=>{dispatch({type: 'times/add'})}}>点击 +</button>
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    times: state.times
  }
}

export default connect(mapStateToProps)(ClickTimesPage);
