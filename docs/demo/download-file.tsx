import React from 'react';
import { downloadFile } from 'react-core-form-tools';
import { Button } from '@arco-design/web-react';

export default () => {
  return (
    <Button
      onClick={() => {
        downloadFile(
          'https://img.alicdn.com/imgextra/i3/O1CN01SJTtza1IXcPe4sxiY_!!6000000000903-0-tps-2500-1406.jpg',
          'test.png',
        );
      }}
      type="primary"
    >
      下载
    </Button>
  );
};