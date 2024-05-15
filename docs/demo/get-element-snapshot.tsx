import React from 'react';
import { getElementSnapshot } from 'lyr-extra';
import { Space, Button } from '@arco-design/web-react';

export default () => {
  const { printImg, downloadImg, getDataURL, copyImg } = getElementSnapshot(
    '.__dumi-default-menu-header',
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
            await copyImg();
          }}
        >
          一键截图
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
      {base64 && <img src={base64} style={{ width: 200 }} />}
    </>
  );
};