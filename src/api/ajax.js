/* 
  统一管理ajax请求的拦截器
*/
import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios.create:返回一个新的axios对象
const instance = axios.create({
  timeout:20000
}
)

/*
  请求响应进度条显示：采用第三方nprogress库，
    1.需要引入+css引入
 */

/*
  请求拦截器：数据的转换：对象转urlencoded形式 
    1.使用querystring库，专门用于对象转urlencoded类型的数据
      使用qs.stirngify(对象数据)
 */
instance.interceptors.request.use(
  config => {
    // 显示请求进度条
    NProgress.start()

    const {data} = config
    if(data instanceof Object) {
      console.log('请求的数据为对象类型的')
      config.data = qs.stringify(data) 
    }
    //必须要return config。否则下面得到发送到请求参数
    return config
  }
)
/*
  响应拦截器： 
    1,统一处理成功的数据返回形式
    2,统一处理请求错误
 */
instance.interceptors.response.use(
  response => {
    // 显示请求进度条
    NProgress.done()

    // 请求成功，数据存放在response.data中
    // 通过判读返回数据的status状态判断登录是否成功
    let {status,data} = response.data
    console.log(status)
    if(status === 0){
      // 请求成功，直接放回成功数据的data
      console.log('请求成功')
      return data
    }else{
      // 用户或者密码错误情况,提示显示——通过antd中函数message
      let {msg} = response.data
      message.error(msg)
      return Promise.reject(msg)
    }
  },
  error => {
    // 请求失败，中断promise链
    message.error(error.message)
     // 中断promise链, 外部不需要再处理请求出错的情况
    return new Promise(()=>{})
  }
)

export default instance