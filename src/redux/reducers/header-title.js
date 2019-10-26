import { SET_HEADER_TITLE } from '../action-type'

const initState = '主页'
const HeaderTitle = (preState = initState,action) => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return preState
  }
}
export default HeaderTitle