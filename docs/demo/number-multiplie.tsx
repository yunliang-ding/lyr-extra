import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { BigNumber } from 'lyr-extra';

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.multiplie(19.9, 100));
  };
  return (
    <>
      <div>19.9 * 100 = {19.9 * 100}</div>
      <div> 19.9 * 100 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};