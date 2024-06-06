# MarkdownViewer 解析 md

## 基本使用

```tsx | react
import { MarkdownViewer } from "lyr-extra";

export default () => {
  return (
    <MarkdownViewer
      content={`
# 一级标题
## 二级标题
### 三级标题
> 区块信息
1. 描述1
2. 描述2
3. 描述3
## 代码块
\`\`\`\jsx
export default () => {
  return <div className='app'>代码块</div>
}
\`\`\`
## 脚本
\`\`\`\shell
yarn add @arco-design/web-react
yarn add lyr-component
\`\`\`
## 样式
\`\`\`\less
@import "@arco-design/web-react/dist/css/arco.css";
\`\`\`
## 数据表格
|学号|姓名|年龄|地址|
|----|----|----|----|
|1|张三|20|地址地址地址|
|2|李四|18|地址地址地址|
|3|王五|23|地址地址地址|
`}
    />
  );
};
```

## 渲染 React 组件

```tsx | react
import { MarkdownViewer } from "lyr-extra";

const user = { name: "zhangsan", age: 12 };

export default () => {
  return (
    <MarkdownViewer
      source={{
        "user.ts": `export default ${JSON.stringify(user, null, 2)}`,
      }}
      require={{
        "user.ts": user,
      }}
      content={`
## 渲染组件
\`\`\`\jsx | react | var(--color-fill-2)
import userInfo from "user.ts";\n
export default () => {
  return <div className='app'>{userInfo.name}</div>
}
`}
    />
  );
};
```

## 展示 React 组件

```tsx | react
import { MarkdownViewer } from "lyr-extra";

export default () => {
  const user = { name: "zhangsan", age: 12 };
  return (
    <MarkdownViewer
      content={`
## 仅展示
\`\`\`\jsx | pureReact
export default () => {
  return <button>仅展示渲染结果</button>
}
\`\`\`
`}
    />
  );
};
```

## 切换代码主题

```tsx | react
import { MarkdownViewer } from "lyr-extra";

const user = { name: "zhangsan", age: 12 };

export default () => {
  const mdRef = React.useRef({});
  return (
    <div>
      <button
        onClick={() => {
          mdRef.current.setTheme("dark");
        }}
      >
        dark 主题
      </button>
      &nbsp; &nbsp;&nbsp;
      <button
        onClick={() => {
          mdRef.current.setTheme("light");
        }}
      >
        light 主题
      </button>
      <MarkdownViewer
        ref={mdRef}
        source={{
          "user.ts": `export default ${JSON.stringify(user, null, 2)}`,
        }}
        require={{
          "user.ts": user,
        }}
        content={`
## 依赖脚本
\`\`\`\html
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js"></script>
\`\`\`

## 代码段
\`\`\`\jsx
export default () => {
  return <button>代码段</button>
}
\`\`\`

## 渲染组件
\`\`\`\jsx | reactExpand | var(--color-fill-2)
import userInfo from "user.ts";\n
export default () => {
  return <div className='app'>{userInfo.name}</div>
}
`}
      />
    </div>
  );
};
```

## API

```ts
export interface MarkDownViewerProps {
  /** 文件内容 */
  content: string;
  /**
   * 代码主题色
   * @default dark
   */
  codeTheme?: string;
  /** 解析 React 组件的依赖 */
  require?: any;
  /** 依赖的源码 */
  source?: any;
}
```
