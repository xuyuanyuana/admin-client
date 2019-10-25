/*自定义高阶组件登录检查 
*/
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// 高阶组件：接收一个组件作为参数返回一个组件
function withCheckLogin(WrappedComponent) {
  @connect(
    state => ({hasLogin:state.user.hasLogin})
  )
  class HocComponent extends React.Component{
    render(){
      // 1.判断hasLogin是否为true并且在login页面，跳转到
        // 非路由组件中获取path：react-router-dom中提供了高阶组件：withRouter
      // 2.判断hasLogin是否为false并且在admin页面，跳转到login
      const {hasLogin,...rest} = this.props
      const {pathname} = this.props.location
      if(hasLogin && pathname === '/login'){
        return <Redirect to='/'/>
      }
      if(!hasLogin && pathname !== '/login'){
        return <Redirect to='/login'/>
      }
      // 将接收的所有属性传递给包装组件
      return <WrappedComponent {...rest}/>
    }
  }
  return HocComponent
}

export default withCheckLogin
