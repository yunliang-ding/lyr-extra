import React, { useState } from 'react';
import { NumberFormat } from 'lyr-extra';
import { InputNumber, Space } from '@arco-design/web-react';

export default () => {
  const [value, setValue]: any = useState(1201201212.32);
  return (
    <Space direction="vertical">
      <InputNumber value={value} onChange={setValue} style={{ width: 200 }} />
      <div>小数点2位: {NumberFormat(value)}</div>
      <div>
        小数点4位:
        {NumberFormat(value, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </div>
    </Space>
  );
};