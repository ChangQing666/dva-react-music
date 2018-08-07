export default{
  namespace: 'count',
  state: 0,
  reducers: {
    plus(state){
      return state+1;
    },
    reduce(state){
      return state-1;
    }
  }
}
