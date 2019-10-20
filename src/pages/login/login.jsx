import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd'

import logo from '../../assets/images/logo.png'
import './login.less'

const Item = Form.Item
class Login extends Component {
  handleSubmit = e=>{
    e.preventDefault()
    /* 1.获取输入内容，
      2，校验 
      3.发送ajax请求
    */
  //  对表单进行统一验证
    const {validateFields} = this.props.form
    validateFields((errors,{username,password})=>{
// errors为收集好的错误，values为收集好的输入内容
      if(!errors){
        console.log('发请求啦,用户名：'+username+'密码：'+password)
      }else{
      }
    })
    
  }
  validatePwd = (rule,value,callback)=>{
    /*
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成 
     */
    if(!value){
      callback('密码不能为空')
    }else if(value.length < 4){
      callback('密码必须大于等于4位')
    }else if(value.length > 12){
      callback('密码必须小于等于12位')
    }else if(/^[a-zA-Z0-9]+$/.test(value)){
      callback('必须是英文、数字组成')
    }else{
      // 验证通过，注意：callback必须被调用
      callback()
    }
  }

  render() {
    console.log(this)
    //经过 Form.create 包装的组件将会自带 this.props.form 属性
    const {getFieldDecorator} = this.props.form

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
                      {validator:this.validatePwd}
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
    )
  }
}
const wrap = Form.create()(Login)
export default  wrap
