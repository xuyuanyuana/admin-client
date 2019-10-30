import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd';

import { reqUsers } from '../../api/'
import LeftNav from './left-nav'
import AdminHeader from './header'
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
              {this.props.children}
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