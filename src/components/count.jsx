import React, { Component } from 'react';

class Count extends Component {
  // 创建ref容器,保存到组件对象上
  numberRef =React.createRef()

  increment = () =>{
    // 获取select选中的值
    let value = this.numberRef.current.value*1
    // 调用更新的方法
    this.props.increment(value)
  }
  decrement = () =>{
    // 获取select选中的值
    let value = this.numberRef.current.value*1
    // 调用更新的方法
    this.props.decrement(value)
  }
  render() {
    console.log(this)
    // 获取store中保存的值，方法为getState():返回的是数据本身
    const count = this.props.count
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>&nbsp;&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
          <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    );
  }
}

export default Count;