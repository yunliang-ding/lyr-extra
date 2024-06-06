# 解决精度问题

## BigNumber.add

```tsx | react
import { useState } from 'react';
import { BigNumber } from 'lyr-extra';
import { Button } from "@arco-design/web-react";

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.add(0.1, 0.2));
  };
  return (
    <div>
      <div>0.1 + 0.2 = {0.1 + 0.2}</div>
      <div> 0.1 + 0.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </div>
  );
};
```

## BigNumber.minus

```tsx | react
import { useState } from 'react';
import { BigNumber } from 'lyr-extra';
import { Button } from "@arco-design/web-react";

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.minus(1.5, 1.2));
  };
  return (
    <div>
      <div>1.5 - 1.2 = {1.5 - 1.2}</div>
      <div> 1.5 - 1.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </div>
  );
};
```

## BigNumber.multiplie

```tsx | react
import { useState } from 'react';
import { BigNumber } from 'lyr-extra';
import { Button } from "@arco-design/web-react";

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.multiplie(19.9, 100));
  };
  return (
    <div>
      <div>19.9 * 100 = {19.9 * 100}</div>
      <div> 19.9 * 100 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </div>
  );
};
```

## BigNumber.divided

```tsx | react
import { useState } from 'react';
import { BigNumber } from 'lyr-extra';
import { Button } from "@arco-design/web-react";

export default () => {
  const [total, setTotal] = useState(null);
  const submit = () => {
    setTotal(BigNumber.divided(0.3, 0.1));
  };
  return (
    <div>
      <div>0.3 / 0.1 = {0.3 / 0.1}</div>
      <div> 0.3 / 0.1 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </div>
  );
};
```