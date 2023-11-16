import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { BigNumber } from 'react-core-form-tools';

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.minus(1.5, 1.2));
  };
  return (
    <>
      <div>1.5 - 1.2 = {1.5 - 1.2}</div>
      <div> 1.5 - 1.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};