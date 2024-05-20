## getUrlSearchParams 获取 url 参数

### 基本使用

```tsx | react
import { useState } from "react";
import { getUrlSearchParams } from "lyr-extra";

export default () => {
  const [value, setValue] = useState(
    "https://xxx.xxx/#/abc?id=10001&name=hello&age=20"
  );
  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{ width: 400 }}
      />
      <div>解析: {JSON.stringify(getUrlSearchParams(value))}</div>
    </div>
  );
};
```
