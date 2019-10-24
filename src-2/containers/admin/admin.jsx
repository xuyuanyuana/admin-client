import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {removeUserToken} from '../../redux/action-creators/user' 
/* 
  (dispatcher) => {
    removeUserToken = () => {dispatcher()}
  }
*/
// 通过props传递过去给UI组件Admin
@connect(
  state => ({user:state.user.user,hasLogin: state.user.hasLogin}),//需要传递的一般属性（函数方式返回对象）state为store.getState()的返回值
  {removeUserToken}//函数的简写：函数参数store.dispatch，内部调用dispatch函数更新state
)
class Admin extends Component{
  render(){
    // 返回一个虚拟dom
    console.log(this.props)
    // 如果当前没有登陆, 自动跳转到登陆界面
    if (!this.props.hasLogin) {
      return <Redirect to="/login"/>
    }


    return (
      <div>
        <p>当前登录用户名：{this.props.user.username}</p>
        <button onClick={this.logout}>退出登录</button>
      </div>

    )
  }
  logout = () => {
    this.props.removeUserToken()
  }
}
export default Admin
