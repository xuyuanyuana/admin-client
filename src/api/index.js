//管理多个请求模块的函数
import axios from './ajax'

export  const reqLogin = (username,password) => axios.post('/login',{username,password})
