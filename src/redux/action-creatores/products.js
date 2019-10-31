// 管理所有商品的action
import { reqProductList,reqSearchProductList,reqAddOrUpdateProduct,reqUpdateProductStatus } from '../../api/product'
import { GET_PRODUCT_LIST,GET_SEARCH_PRODUCT_LIST,UPDATE_PRODUCT_STATUS } from '../action-type'

// 异步获取所有商品
export const getProductListAsync = (pageNum,pageSize) => {
  return async dispatch => {
    let result = await reqProductList(pageNum,pageSize)
    console.log(result.data.list)
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

// 异步添加/更新商品列表
export const addOrUpdateProductAsync = (values) => {
  return async dispatch => {
    // 1.执行异步任务
    let result = await reqAddOrUpdateProduct(values)
    console.log(result)
    if(result.status === 0){
      // 2.分发异步action
      //dispatch({type:values._id? UPDATE_PRODUCT : ADD_PRODUCT,data:result.data})
      console.log('成功')
    }
    return result.msg
  }
}

// 异步更新商品的状态
export const updateProductStatusAsync = (_id,status) => {
  return async dispatch => {
    // 1.执行异步任务
    let result = await reqUpdateProductStatus(_id,status)
    console.log(result)
    if(result.status === 0){
      // 2.分发异步action
      dispatch({type:UPDATE_PRODUCT_STATUS,data:{_id,status}})
    }
    return result.msg
  }
}


