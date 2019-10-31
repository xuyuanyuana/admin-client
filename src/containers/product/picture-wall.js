import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PictureWall extends Component {
  // 所有图片数据
  state = {
    // 是否可提前预览
    previewVisible: false,
    // 预览图片 
    previewImage: '',
    // 所有图片详细信息
    fileList: [
    
    ]
  };
  
  // 隐藏预览模态框
  handleCancel = () => this.setState({ previewVisible: false });

  // 处理图片预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // 展示模态框
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // 图片改变时（上传，删除）
  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          // 展示的图片列表
          fileList={fileList}
          // 预览处理
          onPreview={this.handlePreview}
          // 图片上传，删除处理
          onChange={this.handleChange}
        >
          {/* 是否展示上传按钮，图片大于8张时不展示 */}
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        {/* 预览模态框 */}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PictureWall

