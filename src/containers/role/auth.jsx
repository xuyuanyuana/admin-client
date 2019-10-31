import React, { Component } from 'react'
import { Tree,Form,Input } from 'antd'

import menuList from '../../config/menu-list'

const { TreeNode } = Tree
const {Item } = Form 
class Auth extends Component {
  // 父组件传递role对象
  state = {
    checkedKeys: this.props.role.menus ||[]
  };

  // 向外部组件提供所有勾选的key数组
  getMenus = () => this.state.checkedKeys

  // 必须执行的
  onCheck = checkedKeys => {
    // 受控组件实时更新状态
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  renderTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {

      if (!item.isPublic) {
        // 向pre中<TreeNode>
        pre.push(
          <TreeNode title={item.title} key={item.key}>
            {item.children ? this.renderTreeNodes(item.children) : null}
          </TreeNode>
        )
      }
      return pre
    }, [])
  }

    /* 
  接收到了新的属性时调用 role
  */
  componentWillReceiveProps (nextProps) { 
    this.setState({
      checkedKeys: nextProps.role.menus
    })
  }

  render() {
    const {name} = this.props.role
    const {checkedKeys} = this.state
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    return (
      <div>
        <Item label="角色名称" {...formLayout}>
          <Input placeholder="请输入角色名称" value={name} disabled/>
        </Item>
        <Tree
        checkable
        defaultExpandAll
        onCheck={this.onCheck}
        checkedKeys={checkedKeys}
      >
        {this.renderTreeNodes(menuList)}
      </Tree>

      </div>
    );
  }
}

export default Auth