import React from 'react';
import { downloadFile, docxReplace } from 'react-core-form-tools'
import { Button, Space, Upload } from 'antd';

const data = {
  field1: 'zhangsan',
  field2: 'lisi',
  field3: '这是描述信息',
}

export default () => {
  const [files, setFiles]: any = React.useState([]);
  const onReplace = () => {
    docxReplace(files[0]?.originFileObj, data, {
      filename: '自定义文件名称',
      delimiters: {
        start: '{',
        end: '}',
      },
    });

    // 支持同时替换多个，并下载zip
    // docxReplaceBatch(files, data, {
    //   filename: '自定义文件名称.zip',
    //   delimiters: {
    //     start: '{',
    //     end: '}',
    //   },
    // });
  };

  const onDownloadDemo = () => {
    downloadFile(
      '',
      'demo.docx',
    );
  };

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <div>
        <Button onClick={onReplace} disabled={!files?.length} type="primary">
          替换
        </Button>
        <Button type="link" onClick={onDownloadDemo}>
          文件模版
        </Button>
      </div>
      <Upload
        maxCount={1}
        accept=".docx"
        onChange={({ fileList }) => {
          setFiles(fileList);
        }}
      >
        <Button>上传替换的文档</Button>
      </Upload>
    </Space>
  );
};