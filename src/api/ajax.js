// 公共请求处理
import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {message} from 'antd'

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
    message.error('请求异常'+error)
    return new Promise(()=>{})
  }
)

export default instance