import React, { Component } from 'react';
import {Card, List, Icon, message} from 'antd'

import LinkButton from '../../components/link-button'
import './detail.less'
import memory from '../../utils/memory';
import { reqProductById } from '../../api/product'
import { reqCategoryByProductId } from '../../api/category'

const Item = List.Item
class Detail extends Component {
  // 注意需要状态进行管理才能动态实现展示
  state = {
    product:{},
  }
  getProduct = async() => {
    const {product} = memory
    if(!product){
      // 发送请求获取商品
      const id = this.props.match.params.id
      try {
        let result = await reqProductById(id)
        if(result.status === 0){
          product = result.data
        }
      } catch (error) {
        message.error(error)
      } 
    }
    product.categoryName = await this.getCategory(product.categoryId)
    this.setState({
      product
    })
  }

  getCategory = async(categoryId) => {
      // 获取分类名
      let categoryName
      try {
        let result = await reqCategoryByProductId(categoryId)     
        if(result.status === 0){
          console.log(result.data)
          categoryName = result.data.name
        } 
      } catch (error) {
        message.error(error)
      }
      return categoryName
  }
  
  componentDidMount(){
    this.getProduct()
  }

  render() {
    const {product} = this.state
    console.log(product)
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="product-detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="product-detail-left">所属分类:</span>
            <span>{product.categoryName}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品图片:</span>
            <span>
            </span>
          </Item>
          <Item>
            <span className="product-detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{__html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}

export default Detail;