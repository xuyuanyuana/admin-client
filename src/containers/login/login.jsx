import React, { Component } from 'react';
import { Form,Input,Icon,Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import logo from './images/logo.png'
import './login.less'
import { loginSync } from '../../redux/action-creatores/user'

const Item = Form.Item

@connect(
  (state) => ({user:state.user}),
  {loginSync}
)
@Form.create()
class Login extends Component {
  handleSubmit = (e) => {
    // 阻止默认行为的跳转
    e.preventDefault()
    // 表单项统一验证
    const {validateFields} = this.props.form
    validateFields(async(errors,values) => {
      if(!errors){
        // 发送ajax请求
        const {username,password} = values
        console.log('发送请求')
        this.props.loginSync(username,password)
      }else{
        // 什么也不做
      }
    })
  }  
  render() {
    const {getFieldDecorator} = this.props.form

    const {hasLogin} = this.props.user
    if(hasLogin){
      return <Redirect to="/"/>
    }
    return (
      <div>
      <header className='login-header'>
        <img src={logo} alt="logo"/>
        <h1>后台管理系统</h1>
      </header>
      <div className='login-content'>
        <h1>用户登录</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            {
               // 声明式验证方式
              getFieldDecorator('username',{
                /* 
                用户名/密码的的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是英文、数字或下划线组成
                */ 
               initialValue: '', // 初始值
                rules:[
                  {required:true,whitespace:true,message:'请输入用户名'},
                  {min:4,message:'必须大于等于4位'},
                  {max:12,message:'必须小于等于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成'}
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )
            }
          </Item>
          <Item>
            {
              // 自定义验证
              getFieldDecorator('password',{
                initialValue: '', // 初始值
                rules:[
                  {required:true,whitespace:true,message:'请输入用户名'},
                  {min:4,message:'必须大于等于4位'},
                  {max:12,message:'必须小于等于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成'}
                ]
              })
              (
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )
            }
          </Item>   
          <Item>      
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Item>
        </Form>
      </div>
</div>
    );
  }
}

export default Login;