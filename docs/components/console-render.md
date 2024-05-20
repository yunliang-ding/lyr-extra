## ConsoleRender

### 渲染日志

```tsx | react
import { useEffect } from "react";
import { ConsoleRender } from "lyr-extra";

export default () => {
  const consoleInstance = ConsoleRender.create({
    target: "#console-container",
  });
  useEffect(() => {
    consoleInstance.listener();
    console.log(100, "test", new Date(), Object, () => {}, null, undefined);
    console.log(
      [1, 2, 3, 4],
      { name: "test", age: 10 },
      { address: "test", liked: [1, 2, 3] },
      [100, 200]
    );
    return consoleInstance.destory;
  }, []);
  return (
    <>
      <button
        onClick={() => {
          consoleInstance.clear();
        }}
      >
        清空日志
      </button>
      <br />
      <br />
      <div id="console-container" />
    </>
  );
};
```
