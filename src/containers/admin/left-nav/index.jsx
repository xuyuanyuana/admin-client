import React, { Component } from 'react';
import './index.less'
import { Menu, Icon } from 'antd';
import { Link,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import logo from '../../../asset/images/logo.png'
import menuList from '../../../config/menu-list'
import setHeaderTitle from '../../../redux/action-creatores/header-title'

const { SubMenu } = Menu;
const {Item } = Menu

@connect(
  state => ({headerTitle:state.headerTitle}),
  {setHeaderTitle}
)
@withRouter
class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  getMenuList = (menuList) => {
    return menuList.map((item) => {
        const path = this.props.location.pathname
        if(!item.children){
          if(item.key === path && this.props.headerTitle !== path){
            // 更新：对比state中的title是否和当先选中的path相等，不相等的话进行更新
            this.props.setHeaderTitle(item.title)
          }
          // Item
          return (
            <Item key={item.key}>
              <Link to={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
              </Link>
            </Item>
          )        
        }else{
          // SubMenu
          // path=/charts/bar  item.key=/products | /charts
          console.log(path)
          if( item.children.some(item => item.key === path)){
            this.openKey = item.key
          }
          console.log('openKey'+this.openKey)
          return (
            <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
            >
              {this.getMenuList(item.children)}
            </SubMenu>
          )
        }
    })
  }

  render() {
    const selectKey = this.props.location.pathname
    // 注意：openKey需要等待getMenuList执行完才有openKey
    const menuNode = this.getMenuList(menuList)
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <header>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </header>

      <Menu
      // 默认选中当前路由：获取当前地址，高阶函数包装
        selectedKeys={[selectKey]}
        mode="inline"
        theme="dark"
        defaultOpenKeys={[openKey]}
      >
        {menuNode}
      </Menu>
      </div>
    );
  }
}
export default LeftNav