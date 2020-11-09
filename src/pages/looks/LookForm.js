import React from "react";
import { Upload, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

import "./LookForm.css";

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',  
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


const LookForm = () => {
 
  return (
    <div className="this">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <CameraOutlined />
        </p>
        <p className="ant-upload-text">Create Look</p>
        <p className="ant-upload-hint">
          Start with a photo <br/>
        Click, or drag here a file
        </p>
      </Dragger>
    </div>
  );
};

export default LookForm;

