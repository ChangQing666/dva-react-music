import React from 'react';
const Countor = ({onPlus, onReduce, num})=>{
  return (
    <div>
      <h1>当前数值：{num}</h1>
      <button onClick={onPlus}>+</button>
      <button onClick={onReduce}>-</button>
    </div>
  )
}

export default Countor;
