// 管理category的action
import { 
  GET_CATEGORY_List,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action-type'
import { reqCategoryList,reqAddCategory,reqUpdateCategory } from '../../api'

const getCategoryList = (category) => ({type:GET_CATEGORY_List,data:category})

export const getCategoryListAsync = () => {
  return async (dispatch) => {
    // 发送异步请求
    let result = await reqCategoryList()  
    // 分发同步action（数据存放到store中去）
    if(result.status === 0){
      dispatch(getCategoryList(result.data))
    }
  
    return result.msg
  }
} 

export const addCategoryAsync = (categoryName) => {
  return async dispatch => {
    let result = await reqAddCategory(categoryName)
    if(result.status === 0){
      dispatch({type:ADD_CATEGORY,data:result.data})
    }
    return result.msg
  }
}

export const updateCategoryAsync = ({categoryId,categoryName}) => {
  return async dispatch => {
    // 该api没有data数据返回
    let result = await reqUpdateCategory({categoryId,categoryName})
    if(result.status === 0){
      // 成功
      dispatch({type:UPDATE_CATEGORY,data:{categoryId,categoryName}})
    }
    return result.msg
  }
}