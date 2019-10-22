/*reducer是一个函数 
reducer是实际做事的人。帮store做事的人
    reducer函数：根据当前state和指定action返回一个新的state
*/
// 创建用于管理count的reducer函数，reducer是一个纯函数
/*
纯函数： 1，不得改写参数数据，2，不能调用不纯函数
 */
import {INCREMENT,DECREMENT} from '../action-type'

export default function count(preState = 0,action){
    console.log(preState,action)
    if(action.type === INCREMENT){
      return preState + action.data
    }else if(action.type === DECREMENT){
      return preState - action.data
    }else{
      return preState
    }
}