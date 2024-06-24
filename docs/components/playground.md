## 基本使用

```jsx | react | var(--color-fill-2)
import { Playground } from 'lyr-extra';
import * as ArcoDesign from '@arco-design/web-react';

export default () => {
  return (
    <Playground
      require={{
        '@arco-design/web-react': ArcoDesign,
      }}
      code={`import App from "app.tsx";

export default () => {
  return <App />
}
`}
      dependencies={{
        'app.tsx': `import { useState } from "react";
import { Button } from "@arco-design/web-react";

export default () => {
  const [count, setCount] = useState(0);
  return <Button 
    type="primary" 
    onClick={() => {
      setCount(count+1)
    }}
  >
    {count}
  </Button>
}`,
      }}
    />
  );
};
```
