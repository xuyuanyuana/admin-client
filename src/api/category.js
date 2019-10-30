/* 
管理分类的请求函数模块
*/
import {message} from 'antd'

import axios from './ajax'

// 获取分类列表
export const reqCategoryList = () => axios('/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName) => axios({
  url:'/manage/category/add',
  method:'POST',
  data:{
    categoryName
  }
})

// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => axios({
  url:'/manage/category/update',
  method:'POST',
  data:{
    categoryId,
    categoryName
  }
})

// 根据商品id获取分类信息
export const reqCategoryByProductId = (categoryId) => axios({
  url:'/manage/category/info',
  params:{
    categoryId
  }})