import React, { Component } from 'react';
import './index.less'
import LinkButton from '../../../components/link-button'
import { connect } from 'react-redux'
import withCheckLogin from '../../with-check-login'
import dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'
import { removeUserToken } from '../../../redux/action-creatores/user'

@connect(
  state => ({username:state.user.user.username}),
  {removeUserToken}
)
@withRouter
@withCheckLogin
class AdminHeader extends Component {
  state = {
    currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  logout = () => {
    console.log('退出登录')
    this.props.removeUserToken()
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')})
    }, 1000);
  }
  
  componentWillMount() {
    clearInterval(this.intervalId)
  }

  render() {
    const {currentTime} = this.state
    const {pathname} = this.props.location
    console.log(this.props)
    return (
      <div className='admin-header'>
          <div className="header-top">
            <span>欢迎{this.props.username}</span>
            <LinkButton onClick={this.logout}>退出</LinkButton>
          </div>
          <div className="header-bottom">
            <span>{pathname}</span>
            <div>
              <span>{currentTime}</span>
              <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="yin"/>
              <span>小雨转多云</span>
            </div>
          </div>
      </div>
    );
  }
}
export default AdminHeader