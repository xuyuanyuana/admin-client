/* 
  管理n个请求函数的模块
  返回值必须是一个promise对象
*/
import axios from './ajax'

// 登录模块:返回一个promise对象
export const reqLogin = (username,password) =>  axios.post('/login',{username,password})