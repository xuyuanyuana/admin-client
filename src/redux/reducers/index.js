import { combineReducers } from 'redux'

import user from './user'
import xxx from './xxx'

// 生成总的state
/* 
  {
    user: { user:{},
            token:'',
            hasLogin:false},
    xxx:''
  }
*/
export default combineReducers({user,xxx})