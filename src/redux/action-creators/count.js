/* action是一个对象 */
/* 同步action是对象：{type：‘’，data：} 
  异步action是函数
*/
import {INCREMENT,DECREMENT,INCREMENT_IF_ODD,INCREMENT_ASYNC} from '../action-type'

export const increment = (number) => ({type:INCREMENT,data:number})
export const decrement = (number) => ({type:DECREMENT,data:number})
