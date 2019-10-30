/* 
管理商品请求模块的函数
*/
import axios from './ajax'

// 获取所有商品
export const reqProductList = (pageNum,pageSize) => axios({
  url:'/manage/product/list',
  params:{
    pageNum,
    pageSize
  }
})

// 查询商品列表
export const reqSearchProductList = ({searchType,searchName,pageNum,pageSize}) => axios({
  url:'/manage/product/search',
  params:{
    [searchType]:searchName,
    pageNum,
    pageSize
  }
})

// 添加/修改商品
export const reqAddOrUpdateProduct = (values) => (
  axios.post('/manage/product/'+(values._id?'update':'add'),values)
)  

// 更新商品状态
export const reqUpdateProductStatus =  (_id,status) => axios({
  url:'/manage/product/updateStatus',
  method:'POST',
  data:{
    _id,
    status
  }
})

// 根据商品id获取商品信息
export const reqProductById = (productId) => axios.get('/manage/product/info',{productId})