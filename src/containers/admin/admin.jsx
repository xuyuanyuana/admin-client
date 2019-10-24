import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {removeUserToken } from '../../redux/action-creatores/user'

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
      </div>
    );
  }

  logout = () => {
    console.log('退出登录')
    this.props.removeUserToken()
  }
}

export default Admin;