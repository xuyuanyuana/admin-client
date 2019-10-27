// 管理所有商品的action
import { reqProductList,reqSearchProductList } from '../../api'
import { GET_PRODUCT_LIST,GET_SEARCH_PRODUCT_LIST } from '../action-type'

// 异步获取所有商品
export const getProductListAsync = ({pageNum,pageSize}) => {
  return async dispatch => {
    let result = await reqProductList({pageNum,pageSize})
    if(result.status === 0){
      // 成功
      dispatch({type:GET_PRODUCT_LIST,data:result.data})
    }  
    // 失败
    return result.msg     
  }
}

// 异步获取搜索的商品列表
export const getSearchProductList = ({searchType,searchName,pageNum,pageSize}) => {
  return async dispatch => {
    let result  = await reqSearchProductList({searchType,searchName,pageNum,pageSize})
    if(result.status === 0){
      // 成功
      dispatch({type:GET_SEARCH_PRODUCT_LIST,data:result.data})
    }
    return result.msg
  }
}



