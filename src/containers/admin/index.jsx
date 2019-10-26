import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd';
import {  Switch,Route,Redirect } from 'react-router-dom'

import { reqUsers } from '../../api/'
import LeftNav from './left-nav'
import AdminHeader from './header'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import User from '../user'
import Role from '../role'
import Line from '../line'
import Bar from '../bar'
import Pie from '../pie'
import { removeUserToken } from '../../redux/action-creatores/user'
import withCheckLogin from '../with-check-login'
const { Footer, Sider, Content } = Layout;

@connect(
  (state) => ({user:state.user.user,hasLogin: state.user.hasLogin}),
  {removeUserToken}
)
@withCheckLogin
class Admin extends Component {
  
  render() {
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
            <LeftNav/>
        </Sider>
        <Layout>
          <AdminHeader/>
          <Content style={{margin:'30px 15px 0 ',backgroundColor:'white'}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to='/home'/>
              </Switch>
          </Content>
          <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
    </Layout>
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