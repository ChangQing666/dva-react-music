import {connect} from 'dva'
import Countor from '../components/Countor'
const Countors = ({dispatch, num})=>{
  function handlePlus(){
    dispatch({
      type: 'count/plus',
    })
  }
  function handleReduce(){
    dispatch({
      type: 'count/reduce',
    })
  }
  return(
    <Countor onPlus={handlePlus} onReduce={handleReduce} num={num}/>
  )
}
function mapStateToProps(state){
  return {
    num: state.count
  }
}
export default connect(mapStateToProps)(Countors)
