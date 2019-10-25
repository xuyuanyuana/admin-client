import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from '../action-type'
import { reqLogin } from '../../api'
import storage from '../../utils/storage'
// action是一个对象
/* 
  同步action返回为对象
  异步action返回为函数
  dispatch(action)：只有更新同步action才能触发reducer更新
*/
// 登录异步
export const loginSync = (username,password) => {
  return async dispatch => {
    console.log('分发')
    // 1,执行异步操作
    const result = await reqLogin(username,password)
    const {user,token} = result.data
    // 存储到local
    // localStorage.setItem('user_key',JSON.stringify(user))
    // localStorage.setItem('token_key',token)
    storage.set('user_key',user)
    storage.set('token_key',token)
    // 2,得到结果后分发同步action
    dispatch(saveUserToken(user,token))
  }
}

// 保存到state中
export const saveUserToken = (user,token) => ({type:SAVE_USER_TOKEN,data:{user,token}})

export const removeUserToken = () => {
  // remove local
  // localStorage.removeItem('user_key')
  // localStorage.removeItem('token_key')
  storage.remove('user_key')
  storage.remove('token_key')
  return {type:REMOVE_USER_TOKEN}
}