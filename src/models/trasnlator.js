import {translate,getProducts} from '../services/service';
export default{
   namespace: 'translator',
   state: {
      output: '',
      products:'',
   },
   reducers: {
     input(state,{payload}){
       return {
         ...state,
         input: payload
       }
     },
     output(state, { payload }) {
       console.log('p', payload)
       return {
         ...state,
         output: payload
       };
     },
     products(state, { payload }) {
       console.log('p', payload)
       return {
         ...state,
         products: payload
       };
     },

   },
   effects: {
     * trans({payload}, {call, put}){
       const result = yield call(translate, payload);
       yield put({
         type: 'output',
         payload: result.data.trans_result[0].dst
       });
     },
     * pros({payload},{call,put}){
       const result = yield call(getProducts);
       console.log(999,result)
       // const productsList = result.data.data.productsList;
       // yield put({
       //   type: 'products',
       //   payload: productsList
       // })
     }
   },
   subscriptions:{

   }
}
