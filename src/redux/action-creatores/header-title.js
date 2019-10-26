import { SET_HEADER_TITLE } from '../action-type'

// 返回一个对象类型的action
const setHeaderTitle = (title) => ({type:SET_HEADER_TITLE,data:title})
export default setHeaderTitle