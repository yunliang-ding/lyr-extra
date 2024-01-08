import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { BigNumber } from 'lyr-extra';

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.add(0.1, 0.2));
  };
  return (
    <>
      <div>0.1 + 0.2 = {0.1 + 0.2}</div>
      <div> 0.1 + 0.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};