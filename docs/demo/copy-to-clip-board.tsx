import React from 'react';
import { copyToClipBoard } from 'react-core-form-tools';
import { Space } from '@arco-design/web-react';

export default () => {
  const text = '这是要复制的文本呀呀呀这是要复制的文本呀呀呀';
  return (
    <Space>
      <span>{text}</span>
      <a
        onClick={async () => {
          await copyToClipBoard(text);
        }}
      >
        复制
      </a>
    </Space>
  );
};