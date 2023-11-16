import React, { useState } from 'react';
import { getUrlSearchParams } from 'react-core-form-tools';
import { Input, Space } from '@arco-design/web-react';

export default () => {
  const [value, setValue] = useState(
    'https://xxx.xxx/#/abc?id=10001&name=hello&age=20',
  );
  return (
    <Space direction="vertical">
      <Input
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        style={{ width: 400 }}
      />
      <div>解析: {JSON.stringify(getUrlSearchParams(value))}</div>
    </Space>
  );
};