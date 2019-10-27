import React, { Component } from 'react'
import { Card,Table,Button,Select,Input,Icon,message } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getProductListAsync,getSearchProductList } from '../../redux/action-creatores/products'
import { PAGE_SIZE } from '../../config'

const { Option } = Select
// admin的子路由组件——商品列表

@connect(
  state => ({
    total:state.products.total,
    list:state.products.list}),
  {getProductListAsync,getSearchProductList}
)
class Product extends Component {
  state = {
    searchType:'productName',
    searchName:'',
    isSearch:false
  }
  
  getProductList = async(pageNum) => {
    let msg
    if(this.isSearch){
      // 发送搜索请求
      const {searchType,searchName} = this.state
      if(!searchName){
        this.isSearch = false
      }
      msg = await this.props.getSearchProductList({searchType,searchName,pageNum,PAGE_SIZE})
      this.isSearch = false
    }else{
      // 发送一般请求
      msg = await this.props.getProductListAsync(pageNum,PAGE_SIZE)
    }

    if(!msg){
      // 成功
      message.success('获取商品列表成功')
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
        dataIndex: 'status',
        render: (price) => (
          <span>
            <Button type="primary">下架</Button>
            <span>在售</span>
          </span>
        )
      },
      {
        width: 100,
        title: '操作',
        render: (product) => (
          <span>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
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
              this.setState({
                isSearch:true
              })
              this.getProductList(1)
            }}
          >搜索
        </Button>
      </span>
    )

    const extra = (
      <Link to="/product/addUpdate">
        <Button type="primary">
          <Icon type='plus'/>
          添加商品
        </Button>
      </Link>
    )
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
            onChange:  this.getProducts
          }}
        >
        </Table>
      </Card>
    );
  }
}

export default Product;