```jsx | pureReact
export default () => {
  return (
    <>
      <p
        className="package-version"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          position: 'relative',
          top: 3,
        }}
      >
        <a href={`https://npmmirror.com/package/lyr-extra`} target="_blank">
          <img alt="npm" src={`https://img.shields.io/npm/dt/lyr-extra`} />
        </a>
        <a href={`https://npmmirror.com/package/lyr-extra`} target="_blank">
          <img
            alt="NPM downloads"
            src={`https://img.shields.io/npm/v/lyr-extra.svg`}
          />
        </a>
      </p>
    </>
  );
};
```

# create 全局状态管理库

- ✨ 思路参看 [resy](https://github.sheincorp.cn/lsbFlying/resy)，感谢文木

## 定义 store

```ts
import { create } from "lyr-extra";

export const store = create({
  count: 1,
  age: 1,
  addCount() {
    this.count++;
  },
});
```

## 使用 store

```tsx
import { store } from "./store";

export default () => {
  const { age } = store.useSnapshot();
  return (
    <div>
      {age}
      <button
        onClick={async () => {
          store.age += 1;
        }}
      >
        添加
      </button>
    </div>
  );
};
```

## lyr-extra

> 由于工具库依赖了部分第三方库，体积比较大，所以只打包了 umd 版本

```html
<!-- window.lyrExtra -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js"></script>
```

## 前提需要引入 cdn 前置依赖 到 window

```html
<!-- window.React -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js"></script>
<!-- window.ReactDOM -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js"></script>
<!-- window.jsxRuntime -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js"></script>
<!-- window.arco -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js"></script>
<!-- window.html2canvas -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/html2canvas.min.js"></script>
<!-- window.JSZip -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jszip.min.js"></script>
<!-- window.Babel -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js"></script>
<!-- markdown-viewer -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-markdown.min.js"></script>
<!-- markdown-viewer 代码高亮 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/shiki.min.js"></script>
<!-- window.lyrCodeEditor 代码演示台 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js"></script>
```
