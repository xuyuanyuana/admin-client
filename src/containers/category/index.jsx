import React, { Component } from 'react'
import { Card,Table, Icon,Button,message,Modal } from 'antd'
import { connect } from 'react-redux'

import LinkButton from '../../components/link-button'
import { getCategoryListAsync,addCategoryAsync,updateCategoryAsync } from '../../redux/action-creatores/categorys'
import DataForm from './data-form'

@connect(
  state => ({cateList:state.categorys}),
  {getCategoryListAsync,addCategoryAsync,updateCategoryAsync}
)
class Category extends Component {
  state = {
    loading:false,
    isShowAdd:false,
    isShowUpdate:false
  }
  // 获取所有分类列表
  getCateList = async() => {
    this.setState({loading:true})
    const msg = await this.props.getCategoryListAsync()
    this.setState({loading:false})
    
      // 获取失败
    if(msg){
      message.error(msg)
    }
  }
  // 添加分类
  addCategory = () => {
    // 1.获取组件dataform中input框的内容--子组件向父组件传递信息（传递form对象）
    // 2.验证是否有效
    this.form.validateFields(async(errors,values) => {
      if(!errors){
    // 3.发送请求
        const { categoryName } = values
        let msg = await this.props.addCategoryAsync(categoryName)
        if(!msg){
          message.success('添加成功')
          this.setState({
            isShowAdd:false
          })
          this.form.resetFields()
        }else{
          message.error(msg)
          
        }
      }
    })
    //this.props.addCategoryAsync()
  }

  // 取消添加分类
  cancelAddCategory = () => {
    this.setState({
      isShowAdd:false
    })
    this.form.resetFields()
  }
  // 修改分类
  updateCategory = () => {
    // 获取分类名进行验证
    this.form.validateFields( async(errors,values) => {
      if(!errors){
        // 获取对应的类id
      
        const categoryId = this.category._id
        console.log(categoryId)
        // 获取输入框中新类名
        const categoryName = values.categoryName
        console.log(categoryName)
        // 发送请求
        let msg = await this.props.updateCategoryAsync({categoryId,categoryName})
        if(!msg){
          message.success('修改成功')
          this.setState(
            {isShowUpdate:false}
          )
          this.form.resetFields()
        }else{
          message.error(msg)
        }
      }
    })
  }
  // 取消修改分类
  cancelUpdateCategory = () => {
    this.setState(
      {isShowUpdate:false}
    )
    this.form.resetFields()
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
        key: 'age',
         // 如果没有指定dataIndex, 接收数据对象参数, 如果指定了dataIndex, 接收对应值的参数
        render: (category) => <LinkButton 
                              onClick={() => {
                                console.log(this)
                                this.category = category
                                this.setState({isShowUpdate:true})
                                }}
                      >
                        修改分类
                      </LinkButton>
      }
    ];           
    const extra = (
          <Button type="primary" style={{float:"right"}} onClick={() => {this.setState({isShowAdd:true})}}>
            <Icon type='plus'/>
              添加
          </Button>
    )            
    return (
      <Card extra={extra}>
        <Table dataSource={this.props.cateList} 
              columns={columns}  
              bordered
              pagination={{pageSize: 5, showQuickJumper: true}} //分页显示，快速搜索跳转    
              />
        <Modal
          title="添加分类"
          visible={this.state.isShowAdd}
          onOk={this.addCategory}
          onCancel={this.cancelAddCategory}
        >
          <DataForm setForm={(form) => {this.form = form}}/>
        </Modal>  

        <Modal
          title="修改分类"
          visible={this.state.isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.cancelUpdateCategory}
        >
          <DataForm setForm={(form) => {this.form = form}} />
        </Modal>      
      </Card>
    )
  }
}

export default Category