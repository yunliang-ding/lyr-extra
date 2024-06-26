# ConsoleRender 渲染日志

## 依赖 cdn

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-object-viewer.min.css"
/>
<link
  rel="stylesheet"
  type="text/css"
  href="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-console.min.css"
/>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-object-viewer.min.js"></script>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-console.min.js"></script>
```

## 基本使用

```tsx | react
import { useEffect } from 'react';
import { ConsoleRender } from 'lyr-extra';
import { Button } from '@arco-design/web-react';

export default () => {
  const { listener, destory, clear } = ConsoleRender.create({
    theme: 'light',
  });
  useEffect(() => {
    listener(document.getElementById('console-container'));
    console.log(100, 'test', new Date(), Object, () => {}, null, undefined);
    console.log([1, 2, 3, 4], {
      user: {
        name: '张三',
        age: 20,
      },
    });
    return destory;
  }, []);
  return (
    <div>
      <Button onClick={clear}>清空日志</Button>
      <br />
      <br />
      <div id="console-container" />
    </div>
  );
};
```
