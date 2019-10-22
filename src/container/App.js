import React, { Component } from 'react';
import { connect } from 'react-redux';

import Count from '../components/count'
import {increment,decrement} from '../redux/action-creators/count.js'


/*
  mapStateToProps: 用于指定向UI组件传递哪些一般属性的回调函数
  mapDispatchToProps：用于指定向UI组件传递哪些一般函数的回调函数
 */
export default connect(
  // state就是store.getState()
  (state) => ({count:state}),
  // 对象中所有方法都会作为函数属性传递给UI组件
  {increment,decrement}
)(Count)
