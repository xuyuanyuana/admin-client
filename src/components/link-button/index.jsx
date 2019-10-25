import React, { Component } from 'react'
import './index.less'
export default class LinkButton extends Component {
  render() {
    return (
      <button className='linkButton' {...this.props}></button>
    )
  }
}
