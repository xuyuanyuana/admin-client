import React, { Component } from 'react';
import './index.less'
import { Menu, Icon } from 'antd';
import { Link,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { withTranslation, getI18n } from 'react-i18next'

import logo from '../../../asset/images/logo.png'
import menuList from '../../../config/menu-list'
import setHeaderTitle from '../../../redux/action-creatores/header-title'

const { SubMenu } = Menu;
const {Item } = Menu

@connect(
  state => ({headerTitle:state.headerTitle,user:state.user.user}),
  {setHeaderTitle}
)
@withRouter
@withTranslation()
class LeftNav extends Component {
  state = {
    collapsed: false,
  };

    /* 
    判断当前登陆用户是否有此item对应的权限
    1. 当前用户是admin
    2. item是公开的
    3. item的key在menus中
    4. item的某个子item的key在menus中
    */
  hasAuth = (item) => {
    const {username, role: {menus}} = this.props.user
    if (username==='admin' || item.isPublic || menus.indexOf(item.key)!==-1) {
      return true
    } else if (item.children) { // 4. item的某个子item的key在menus中
      return item.children.some(cItem => menus.indexOf(cItem.key)!==-1)
    }

    return false
  }

  getMenuList = (menuList) => {
    return menuList.map((item) => {
        const path = this.props.location.pathname
        if(this.hasAuth(item))
        if(!item.children){
          if(item.key === path && this.props.headerTitle !== path){
            // 更新：对比state中的title是否和当先选中的path相等，不相等的话进行更新
            this.props.setHeaderTitle(this.props.t(item.title))
          }
          // Item
          return (
            <Item key={item.key}>
              <Link to={item.key}>
                  <Icon type={item.icon} />
                  <span>{this.props.t(item.title)}</span>
              </Link>
            </Item>
          )        
        }else{
          // SubMenu
          // path=/charts/bar  item.key=/products | /charts
          console.log(path)
          // indexOf返回一个number类型的值，item.key在path中第一次出现的index
          if( item.children.some(item => path.indexOf(item.key) === 0)){
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

  
  componentDidMount () {
    // setInterval(() => {
    //   this.props.i18n.changeLanguage(this.props.i18n.language==='en' ? 'zh-CN' : 'en')
    // }, 2000);
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
          <h1>{this.props.t('title')}</h1>
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