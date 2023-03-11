import React, { useState } from 'react';
import { BigNumber } from 'react-core-form-tools';
import { Button } from 'antd';

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.divided(0.3, 0.1));
  };
  return (
    <>
      <div>0.3 / 0.1 = {0.3 / 0.1}</div>
      <div> 0.3 / 0.1 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};