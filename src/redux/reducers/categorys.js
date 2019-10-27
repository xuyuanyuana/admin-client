// 管理分类的reducer
import { GET_CATEGORY_List,ADD_CATEGORY,UPDATE_CATEGORY } from '../action-type'

// 分类数据是一个数据数组
const initCategory = []
const categorys = (state = initCategory,action) => {
    switch (action.type) {
      case GET_CATEGORY_List:
        return action.data
      case ADD_CATEGORY:
        return [...state,action.data]
      case UPDATE_CATEGORY:
      return state.map(item => {
        if(item._id === action.data.categoryId){
          return {
            _id: action.data.categoryId,
            name: action.data.categoryName
          }
        }else{
          return item
        }
      })
      default:
        return state
    }
}
export default categorys