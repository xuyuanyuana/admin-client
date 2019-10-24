import {combineReducers} from 'redux'

import user from './user'
import hhh from './hhh'

/* 
总state的结构:
  {
    user:{'username':111}
    hhh: 'lallaa'
  }
*/
export default combineReducers({
  user,
  hhh
})