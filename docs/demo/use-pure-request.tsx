import React from 'react';
import axios from 'axios';
import { usePureRequest } from 'react-core-form-tools';
import { Button, Space } from 'antd';

const url = 'http://api.yunliang.cloud/react-core-form/table';

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