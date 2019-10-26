import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'

// 生成总的state
/* 
  {
    user: { user:{},
            token:'',
            hasLogin:false},
    headerTitle:'主页'
  }
*/
export default combineReducers({user,headerTitle})