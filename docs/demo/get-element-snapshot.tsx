import React from 'react';
import { getElementSnapshot } from 'react-core-form-tools';
import { Space, Button } from 'antd';

export default () => {
  const { printImg, downloadImg, getDataURL } = getElementSnapshot(
    '.__dumi-default-menu-logo',
  );
  const [base64, setBase64]: any = React.useState();
  return (
    <>
      <Space>
        <Button type="primary" onClick={printImg}>
          打印元素
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            await downloadImg('元素预览图');
          }}
        >
          下载图片
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            setBase64(await getDataURL());
          }}
        >
          获取图片DataURL
        </Button>
      </Space>
      <br />
      <br />
      {base64 && <img src={base64} style={{ width: 1000 }} />}
    </>
  );
};