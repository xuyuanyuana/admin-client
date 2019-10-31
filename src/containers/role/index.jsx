import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import dayjs from 'dayjs'
import { connect} from 'react-redux'

import { reqRoleList } from '../../api'
import Auth from './auth'
import { reqUpdateRole } from '../../api'


/* 
Admin的角色管理子路由组件
roles
*/
@connect(
  state => ({username:state.user.user.username})
)
class Role extends Component {

  state = {
    role:[],
    isShowAdd: false,
    isShowAuth: false
  }

  authRef = React.createRef()

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色名称',
      dataIndex: 'create_time',
      render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: auth_time => dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      render: (role) => <Button type="link" onClick={() => this.showAuth(role)}>设置权限</Button>
    },
  ]

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const msg = await this.props.addRoleAsync(values.roleName)
        this.form.resetFields()
        if (msg) {
          message.error(msg)
        } else {
          this.setState({
            isShowAdd: false
          })
          message.success('添加角色成功, 请授权')
        }
      }
    })
  }

  hideAdd = () => {
    this.form.resetFields()
    this.setState({
      isShowAdd: false
    })
  }

  // 更新角色权限信息
  updateRole = async () => {
    // 获取role对象，修改menus为选中的值
    const role = this.role
    // 父组件获取子组件的state
    const menus = this.authRef.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.username
    console.log(this.props)
    // 更新状态
    let result = await reqUpdateRole(role)
    if(result.status === 0){
      message.success('授权成功')
    }else{
      message.error(result.msg)
    }
    this.hideUpdate()
  }

  showAuth = (role) => {
    // 缓存要更新的role
    this.role = role

    this.setState({
      isShowAuth: true
    })
  }

  hideUpdate = () => {
    this.setState({
      isShowAuth: false
    })
  }
  
  getRoleList = async() => {
    // 获取角色信息
    let result = await reqRoleList()
    if(result.status === 0){
      this.setState({
        role:result.data
      })
    }else{
      message.error(result.msg)
    }
  }


  componentDidMount () {
    this.getRoleList()
  }

  render() {
    const { isShowAdd,isShowAuth,role} = this.state
    const title = <Button type="primary" onClick={() => {this.setState({isShowAdd: true})}}>添加角色</Button>

    
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={role}
          columns={this.columns}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.hideAdd}
        >
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.hideUpdate}
        >
          <Auth role={this.role} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}

export default Role