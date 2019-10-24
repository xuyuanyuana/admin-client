// 公共请求处理
import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {message} from 'antd'
import store from '../redux/store'
import { removeUserToken } from '../redux/action-creatores/user'
import history from '../history'


const instance = axios.create({
  timeout:30000
})

/*请求拦截器
  1.对象转urlencoded
  2.登录进度显示 
 */
instance.interceptors.request.use(
  (config) => {
    NProgress.start()
    if(config.data){
      let {data} = config
      config.data = qs.stringify(data)
    }  
    if(config.url !== '/login'){
      // 获取token:登录成功后存储在state中
      const {token} = store.getState().user
      config.headers['Authorization'] = 'atguigu_'+token
    }
    return config
  }
)

/*响应拦截器
  1.登录进度完成
  2.统一处理请求失败情况 
 */
instance.interceptors.response.use(
  (response) => {
    NProgress.done()
    
    return response.data
  },
  (error) => {
    // 提示错误信息，中断promise链
    NProgress.done()
    const {status,data:{msg} = {}} = error.response
    // 如果status为401, token有问题
    if(status === 401){
      // 提示失效:在管理员界面提示过期
      // 清除local中的token和state中user与token，跳转登录页面
      // 1.清除state，dispatch——store身上
      if(history.location.pathname !== '/login'){
        message.error(msg)
        console.log(msg)
        store.dispatch(removeUserToken())
      }
    }else if(status === 404){
      message.error('提示访问的资源不存在'+error)
    }else{
      message.error('请求异常'+error.message)
    }
    return new Promise(()=>{})
  }
)

export default instance