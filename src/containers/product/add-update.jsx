import React, { Component } from 'react';
import { Card,Form,Input,Select,Icon,Button,message} from 'antd'
import { connect } from 'react-redux'
import { getCategoryListAsync } from '../../redux/action-creatores/categorys'
import { addOrUpdateProductAsync } from '../../redux/action-creatores/products'
import memory from '../../utils/memory'

import LinkButton from '../../components/link-button'
const {Item} = Form
const {Option} = Select

@connect(
  state => ({cateList:state.categorys}),
  {getCategoryListAsync,addOrUpdateProductAsync}
)
@Form.create()
class AddUpdate extends Component {
  
  submit = () => {
    this.props.form.validateFields(async(errors,values) => {
      if(!errors){
        console.log(values)
        const id = memory.product._id
        if(id){
          values._id = id
        }
        let msg = await this.props.addOrUpdateProductAsync(values)
        if(msg){
          message.error(msg)
        }else{
          if(id){
            message.success('修改成功')
          }else{
            message.success('添加成功')
          }  
          this.props.history.replace('/product')
        }
      }
    })
  }

  // 验证输入价格不能小于等于0
  validatePrice = (rule,value,callback) => {
    if(value <= 0){
      callback('价格不能小于0')
    }else{
      callback()
    }
  }

  componentDidMount() {
    this.props.getCategoryListAsync()
  }

  render() {
    // 取出内存中存储的product
    const { product } = memory
    console.log(product)
    // card左侧
    const title = (
      <span>
        <LinkButton onClick = {() => {this.props.history.goBack()}}>
          <Icon type='arrow-left'/>
        </LinkButton>
        <span>{product._id? '修改': '添加'}商品</span>
      </span>
    )
    // label和input所占栅格大小
    const formItemLayout = {
      labelCol: {
        span:2
      },
      wrapperCol: {
        span:8
      },
    };

    const { cateList } = this.props

    const { getFieldDecorator } = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name',{
                initialValue:product.name || '',
                rules:[
                  {required:true,message:'必须填写商品名称'}
                ]
              })(
                <Input placeholder='商品名称'/>
              )
            }   
          </Item>

          <Item label="商品描述">
            {
              getFieldDecorator('desc',{
                  initialValue:product.desc || '',
                  rules:[
                    {required:true,message:'必须填写商品描述'}
                  ]
                })(
                  <Input placeholder='商品描述'/>
              ) 
            } 
          </Item>

          <Item label="商品价格">
          {
             // 声明式验证方式
              getFieldDecorator('price',{
                  initialValue:product.price || '',
                  rules:[
                    {required:true,message:'必须填写商品描述'},
                    {validator:this.validatePrice}
                  ]
              })(
                <Input placeholder='商品价格' addonAfter="元"/>
              ) 
          }       
          </Item>

          <Item label="商品分类">
          {
              getFieldDecorator('categoryId',{
                  initialValue:product.categoryId ||'',
                  rules:[
                    {required:true,message:'必须填写商品描述'}
                  ]
                })(
                  <Select>
                  <Option value="">未选择</Option>
                  {
                    cateList.map(item => {
                      return (
                        <Option value={item._id} key={item.name}>{item.name}</Option>
                      )
                    })
                  }
                  </Select>
              ) 
          }    
            
            
          </Item>

          <Item label="商品图片">
        
          </Item>

          <Item label="商品详情">
            <Input placeholder='商品价格'  value={product.detail}/>
          </Item>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Form>
      </Card> 
    )
  }
}

export default AddUpdate;