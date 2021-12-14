import React, {useState, useEffect, useMemo} from 'react'
import { getForm } from '../../api/store';
import { Upload, Modal, Table, Tag, Space  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './selft.less'
export default function Self() {
  const [form, setForm] = useState([])
  useEffect(() => {
    getForm().then((data) => setForm(data))
  }, [])
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  console.log(form);
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        url: 'http://localhost:9527/upload/7788白色.jpg',
      },
    ],
  })

  const handleCancel = () => {
    let temp = JSON.parse(JSON.stringify(state))
    temp.previewVisible = false
    setState(temp)
  };

  const handlePreview = async(file) => {
    console.log('调用handlePreview');
    console.log(fileList.length);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    let temp = JSON.parse(JSON.stringify(state))
    temp.previewImage = file.url || file.preview,
    temp.previewVisible = true,
    temp.previewTitle = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    setState(temp);
  };
  // console.log(fileList.length);
  const handleChange = ({ fileList }) => setState({ fileList });

  const { previewVisible, previewImage, fileList, previewTitle } = state;
  console.log(fileList.length);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action="http://localhost:9527/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {/* <Upload
        action="http://localhost:9527/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal> */}
    </>

  )
}
