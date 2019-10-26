import React, { Component } from 'react'
import { Modal, Icon,Button } from 'antd'
import dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'
import screenfull from 'screenfull'

import './index.less'
import LinkButton from '../../../components/link-button'
import { connect } from 'react-redux'
import { removeUserToken } from '../../../redux/action-creatores/user'
import { reqWeather } from '../../../api'

@connect(
  state => ({username:state.user.user.username,headerTitle:state.headerTitle}),
  {removeUserToken}
)
@withRouter
class AdminHeader extends Component {
  state = {
    currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
    weather:{},
    isScreenFull:false
  }

  logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      onOk: () => {
        this.props.removeUserToken()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  getWeather = async(city) => {
    let {dayPictureUrl,weather} = await reqWeather(city)
    // 得到的是一个对象
    this.setState({
      weather:{dayPictureUrl,weather}
    })
  }

  screenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')})
    }, 1000);
    this.getWeather('北京')
    screenfull.onchange(()=> {
      this.setState({
        isScreenFull: !this.state.isScreenFull
      })
    }) 
  }
  
  componentWillMount() {
    clearInterval(this.intervalId)
  }

  render() {
    const {currentTime,isScreenFull} = this.state
    const {headerTitle} = this.props
    
    const {dayPictureUrl,weather} = this.state.weather
    return (
      <div className='admin-header'>
          <div className="header-top">
            <Button size="small" className="screen-full" onClick={this.screenFull}>
              <Icon type={isScreenFull?'fullscreen-exit':'fullscreen'} />
            </Button>
            <span>欢迎{this.props.username}</span>
            <LinkButton onClick={this.logout}>退出</LinkButton>
          </div>
          <div className="header-bottom">
            <span>{headerTitle}</span>
            <div>
              <span>{currentTime}</span>
              <img src={dayPictureUrl} alt="yin"/>
              <span>{weather}</span>
            </div>
          </div>
      </div>
    );
  }
}
export default AdminHeader