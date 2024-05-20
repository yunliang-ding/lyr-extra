## downloadFile 下载文件

### 基本使用

```tsx | react
import { downloadFile } from 'lyr-extra';

export default () => {
  return (
    <button
      onClick={() => {
        downloadFile(
          'https://img.alicdn.com/imgextra/i3/O1CN01SJTtza1IXcPe4sxiY_!!6000000000903-0-tps-2500-1406.jpg',
          'test.png',
        );
      }}
    >
      下载
    </button>
  );
};
```