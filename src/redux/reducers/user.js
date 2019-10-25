// reducer是一个函数，根据已有的state和action产生新的state
import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from '../action-type'
import storage from '../../utils/storage'

// const _user = localStorage.getItem('user_key')
// const _token = localStorage.getItem('token_key')
const _user = storage.get('user_key')
const _token = storage.get('token_key')
const initUser = {
  user:_user,
  token:_token,
  hasLogin:_user&&_token
}
const user = (preState = initUser,action) => {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      const {user,token} = action.data
      return {
        user,
        token,
        hasLogin:true
      }
    case REMOVE_USER_TOKEN:
        return {
          user:{},
          token:'',
          hasLogin:false
        }
    default:
      return preState
  }
} 
export default  user