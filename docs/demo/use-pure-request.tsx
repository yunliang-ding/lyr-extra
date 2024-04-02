import React from 'react';
import axios from 'axios';
import { usePureRequest } from 'lyr-extra';
import { Button, Space } from '@arco-design/web-react';

const url = 'http://api-online.yunliang.cloud/lyr-design/table';

export default () => {
  const [loading, fetchData] = usePureRequest(axios);
  return (
    <div>
      <Space>
        <Button
          onClick={async () => {
            await axios({
              url,
              method: 'GET',
            });
          }}
        >
          普通 axios 点击
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            await fetchData({
              url,
              method: 'GET',
            });
          }}
        >
          使用 usePureRequest 点击
        </Button>
      </Space>
    </div>
  );
};