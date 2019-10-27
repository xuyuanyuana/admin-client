// 管理商品的reducer
import { GET_PRODUCT_LIST,GET_SEARCH_PRODUCT_LIST } from '../action-type'

const initProducts = {
  total:'',
  list:[]
}
const products = (preState=initProducts,action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      const {total,list} = action.data
      return {
        total,
        list
      }
    case GET_SEARCH_PRODUCT_LIST:
      const {stotal,slist} = action.data
      return {
        total:stotal,
        list:slist
      }
    default:
      return preState
  }
}

export default products