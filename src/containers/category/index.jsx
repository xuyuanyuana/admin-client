import React, { Component } from 'react'
import { Card,Table, Icon,Button,message } from 'antd'


import {reqCategoryList} from '../../api'
import LinkButton from '../../components/link-button'

class Category extends Component {
  state = {
    cateList:[],
    loading:false
  }
  getCateList = async() => {
    this.setState({loading:true})
    let result = await reqCategoryList()
    const {status,data} = result
    this.setState({loading:false})
    if(status === 0){
      // 成功
      this.setState({
        cateList:data
      })
    }else{
      // 获取失败
      message.error(result.msg)
    }
  }
  componentDidMount = () => {
    this.getCateList()
    
  }
  render() {
    
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        width: 300,
        title: '操作',
        dataIndex: 'age',
        key: 'age',
        render: () => <LinkButton>修改分类</LinkButton>,
      }
    ];   
                
    const extra = (<Button type="primary" style={{float:"right"}}>
                    <Icon type='plus'/>
                    添加
                  </Button>
                )            
    return (
      <Card extra={extra}>
        <Table dataSource={this.state.cateList} 
              columns={columns}  
              bordered
              pagination={{pageSize: 5, showQuickJumper: true}} //分页显示，快速搜索跳转    
              />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>      
      </Card>
    )
  }
}

export default Category