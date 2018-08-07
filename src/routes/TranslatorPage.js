import React from 'react';
import {connect} from 'dva'
const TranslatorPage = ({dispatch, output, products}) => {
  function handleTranslate(){
    let input = 'girl';
    dispatch({
      type: 'translator/trans',
      payload: input
    })
  }
  function handleGetProducts(){
    dispatch({
      type: 'translator/pros',
      payload: products
    })
  }
  // let lis =  products || products.map((item)=>
  //     <li>{item.name}</li>
  // )
  return(
    <div>
      <input type="text"/>
      <div>
        <button onClick={handleTranslate}>翻译</button>
        <button onClick={handleGetProducts}>产品列表</button>
      </div>
      <div>翻译结果：{output}</div>
      {/*<ul>*/}
        {/*{lis}*/}
      {/*</ul>*/}
    </div>
  )
}

function mapStateToProps(state){
  return {
    output: state.translator.output,
    products: state.translator.products
  }
}

export default connect(mapStateToProps)(TranslatorPage);
