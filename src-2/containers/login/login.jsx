import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import {connect} from 'react-redux'

import logo from '../../assets/images/logo.png'
import './login.less'
// import axios from '../../api/ajax'
import { loginAsync } from '../../redux/action-creators/user'

const Item = Form.Item

@connect(
  state => ({hasLogin:state.user.hasLogin}),
  {loginAsync}
)
@Form.create()
class Login extends Component {
  handleSubmit = e=>{
    e.preventDefault()
  
  //  对表单进行统一验证
    const {validateFields} = this.props.form
    validateFields(async(errors,values)=>{
// errors为收集好的错误，values为收集好的输入内容
      if(!errors){
        // 没有错误则发送ajax请求：注意这里后台只结束urlencoded形式的参数，对象其内部转化为json。所以请求会被拒绝
        // 需在请求拦截器中转换好是数据
        // 解决跨域问题，无需写基础路径，当前在哪就从哪里发
        /* axios.post('/login',values).then(
          (data) => {
            console.log('登录成功')
            console.log(data)
          },
          (msg) => {
            console.log(msg)
          }
        ) */
        let {username,password} = values
        //console.log(username,password)
        // 指定action去干活
        this.props.loginAsync(username,password)
        
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
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){//如果密码不是这样组成的才报错，注意！
      callback('必须是英文、数字组成')
    }else{
      // 验证通过，注意：callback必须被调用
      callback()
    }
  }

  render() {
    //经过 Form.create 包装的组件将会自带 this.props.form 属性
    const {getFieldDecorator} = this.props.form

    const {hasLogin} = this.props
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

export default  Login
