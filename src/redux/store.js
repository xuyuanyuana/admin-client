import {createStore} from 'redux'

import count from './reducers/count'
/* store是redux中的核心对象，相当于管家
  存储的是所有状态，不直接操作
  store创建：通过createStore(reducer)创建
  1.引入redux，得到createStore()函数
  2.创建store对象
  3.暴露store对象
*/
// 创建store对象内部会第一次调用reducer()得到初始状态值
export default createStore(count)


