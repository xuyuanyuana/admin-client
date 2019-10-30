//管理多个请求模块的函数
import jsonp from 'jsonp'
import {message} from 'antd'

import axios from './ajax'

// 请求登录
export const reqLogin = (username,password) => axios.post('/login',{username,password})

// 获取列表
export const reqUsers = () => axios.get('/manage/user/list')

// 获取天气（jsonp类型的请求）
export const reqWeather = (city) => {
    return new Promise((resolve,reject) => {
      jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,(err,data) => {
        if(!err && data.status === 'success'){
          // 只能传一个参数
          const {dayPictureUrl,weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl,weather})
        }else{
          message.error('获取天气失败')
          new Promise(() => {})
        }
      })
    })
}

