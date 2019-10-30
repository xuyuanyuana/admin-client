// 管理商品的reducer
import { GET_PRODUCT_LIST,GET_SEARCH_PRODUCT_LIST,UPDATE_PRODUCT_STATUS } from '../action-type'

const initProducts = {
  total:0,
  list:[]
}
const products = (preState=initProducts,action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      let {total,list} = action.data
      return {
        total,
        list
      }
    case GET_SEARCH_PRODUCT_LIST:
      return {
        total:action.data.total,
        list:action.data.list
      }
    case UPDATE_PRODUCT_STATUS:
      let newlist = preState.list.map(item => {
          if(item._id === action.data._id){
            let status = action.data.status
            return {...item,status}
          }else{
            return item
          }
        })
        console.log('新的'+newlist)
      return {
        total:preState.total,
        list:newlist
      }  
    default:
      return preState
  }
}

export default products