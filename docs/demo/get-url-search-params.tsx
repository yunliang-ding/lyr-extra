import React, { useState } from 'react';
import { getUrlSearchParams } from 'react-core-form-tools';
import { Input, Space } from 'antd';

export default () => {
  const [value, setValue] = useState(
    'https://xxx.xxx/#/abc?id=10001&name=hello&age=20',
  );
  return (
    <Space direction="vertical">
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{ width: 400 }}
      />
      <div>解析: {JSON.stringify(getUrlSearchParams(value))}</div>
    </Space>
  );
};