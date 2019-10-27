import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'
import categorys from './categorys'
import products from './product'

// 生成总的state
/* 
  {
    user: { user:{},
            token:'',
            hasLogin:false},
    headerTitle:'主页',
    categorys:[],
    products:{
      total,
      list:[]
    }
  }
*/
export default combineReducers(
  { user,
    headerTitle,
    categorys,
    products
  }
  )