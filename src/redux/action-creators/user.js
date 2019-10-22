
// user action
import { reqLogin } from '../../api'
import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from '../action_type'
// action分为同步和异步
/* 
  同步action为对象
  异步action为函数
  dispatch(action)：只有更新同步action才能触发reducer更新
*/

export function loginAsync(username,password) {
  // 返回一个异步action函数
    return async dispatch => {
        // 1.执行异步任务——登录
        let data = await reqLogin(username,password)
        // 2.有结果后，分发同步action
          // 保存到localStroage
        let {user,token} = data
        // 保存到localStorage时，对象，数组需要转化为JSON类型的，不然底层会调用toString()
        localStorage.setItem('user_key',JSON.stringify(user))
        localStorage.setItem('token_key',token) 
        //分发同步action  
        console.log('分发')
        dispatch(saveUserToken(user,token))
    }
}

export const saveUserToken = (user,token) => ({type:SAVE_USER_TOKEN,data:{user,token}})


export const removeUserToken = () => {
    // 清除local中的user和token
    localStorage.removeItem('user_key')
    localStorage.removeItem('token_key')
  
    return {type: REMOVE_USER_TOKEN}
}
