import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {removeUserToken } from '../../redux/action-creatores/user'
import { reqUsers } from '../../api/'

@connect(
  (state) => ({user:state.user.user,hasLogin: state.user.hasLogin}),
  {removeUserToken}
)
class Admin extends Component {
  
  render() {
    console.log(this.props)
    if(!this.props.hasLogin){
      return <Redirect to="/login"/>
    }
    return (
      <div>
        hello {this.props.user.username}
        <button onClick={this.logout}>退出登录</button>
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    );
  }

  logout = () => {
    console.log('退出登录')
    this.props.removeUserToken()
  }

  getUsers = async() => {
    console.log('获取用户列表')
    let result = await reqUsers()
    console.log(result)
  }
}

export default Admin;