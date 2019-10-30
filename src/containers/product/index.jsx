import React, { Component } from 'react'
import { Card,Table,Button,Select,Input,Icon,message } from 'antd'
import { connect } from 'react-redux'

import { getProductListAsync,getSearchProductList,updateProductStatusAsync } from '../../redux/action-creatores/products'
import { PAGE_SIZE } from '../../config'
import memory from '../../utils/memory'

const { Option } = Select
// admin的子路由组件——商品列表

@connect(
  state => ({
    total:state.products.total,
    list:state.products.list}),
  {getProductListAsync,getSearchProductList,updateProductStatusAsync}
)
class Product extends Component {
  state = {
    searchType:'productName',
    searchName:'',
  }
  
  // 获取商品列表
  getProductList = async(pageNum) => {
    console.log(this.isSearch)
    let msg
    if(this.isSearch){
      // 发送搜索请求
      const {searchType,searchName} = this.state
      console.log(searchType)
      console.log(searchName)
      if(!searchName){
        return
      }
      // 注意：PAGE_SIZE获取到的只是一个值，需要传递属性名
      msg = await this.props.getSearchProductList({searchType,searchName,pageNum,pageSize:PAGE_SIZE})
      this.isSearch = false
    }else{
      // 发送一般请求
      msg = await this.props.getProductListAsync(pageNum,PAGE_SIZE)
    }

    if(msg){
      message.error(msg)
    }

  }

  updateProduct = async(_id,status) => {
    console.log(_id)
    console.log('当前传递的'+status)
    let msg = await this.props.updateProductStatusAsync(_id,status)
    if(!msg){
      // 成功
      message.success('成功')
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    this.getProductList(1)
  }

  render() {
    const { searchType,searchName } = this.state
    const { total,list } = this.props

    // 列信息
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        width: 100,
        title: '状态',
        render: ({_id,status}) => {  //2是下架。1是在售
          let btnText = '上架'
          let spanText = '在售'
          if(status === 2){
            btnText = '下架'
            spanText = '已下架'
          } 
          return (<span>
                      <Button 
                        type="primary"
                        onClick={
                          () => {
                            this.updateProduct(_id,status===1?2:1)
                          }
                        }
                      >
                      {btnText}
                      </Button>
                      <span>{spanText}</span>
                  </span>)
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => (
          <span>
            <Button 
              type="link"
              onClick={
                () => {
                  // 需携带商品信息
                  memory.product = product
                  this.props.history.push(`/product/detail/${memory.product._id}`)
                }
              }
            >详情</Button>
            <Button 
              type="link" 
              onClick={() => {
                // 需携带商品信息
                memory.product = product
                this.props.history.push('/product/addUpdate')
              }}
            >
              修改
            </Button>
          </span>
        )
      },
    ]

    const search = (
      <span>
        <Select
          value={searchType}
          onChange={value => {this.setState({searchType:value})}}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDec'>按详情搜索</Option>
        </Select>
        <Input 
          placeholder='关键字' 
          style={{width:200,margin:'0 10px'}}
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button
            type="primary" 
            onClick={() => {
              console.log(11111111111111111111111111111)
              this.isSearch = true
              this.getProductList(1)
            }}
          >搜索
        </Button>
      </span>
    )

    const extra = (
        <Button type="primary" onClick={() => {
          // 注意点击添加时清空内存，以防止跳转过修改在跳转添加
          memory.product={}
          this.props.history.push('/product/addUpdate')
        }}>
          <Icon type='plus'/>
          添加商品
        </Button>
    )
    //const { products,total } = this.state
    return (
      <Card
        title={search}
        extra={extra}
      >
        <Table
          bordered
          columns={columns}
          dataSource={list}
          pagination={{
            pageSize: PAGE_SIZE, 
            total, 
            // onChange:  (page) => {this.getProducts(page)}
            onChange:  this.getProductList
          }}
        >
        </Table>
      </Card>
    );
  }
}

export default Product;