import React, { Component } from 'react'
import { Form,Input } from 'antd'
import PropTypes from 'prop-types'

const {Item } = Form
@Form.create()
class DataForm extends Component {

  static propTypes = {
    setForm:PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    // 传递form给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName',{
              
              rules:[
                {required:true,message:'分类名称必须填写'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default DataForm