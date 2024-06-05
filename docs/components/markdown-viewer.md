# MarkdownViewer 解析 md

## 基本使用

```tsx | react
import { MarkdownViewer } from "lyr-extra";

export default () => {
  return (
    <MarkdownViewer
      content={`
# 一级标题\n
## 二级标题\n
### 三级标题\n
> 区块信息\n
1. 描述1\n
2. 描述2\n
3. 描述3\n
## 代码块\n
\`\`\`\jsx\n
export default () => {\n
  return <div className='app'>代码块</div>\n
}\n
\`\`\`\n
## 数据表格\n
|学号|姓名|年龄|地址|\n
|----|----|----|----|\n
|1|张三|20|地址地址地址|\n
|2|李四|18|地址地址地址|\n
|3|王五|23|地址地址地址|\n
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
## 渲染组件\n
\`\`\`\jsx | react | var(--color-fill-2)\n
import userInfo from "user.ts";\n
export default () => {\n
  return <div className='app'>{userInfo.name}</div>\n
}\n
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
## 仅展示\n
\`\`\`\jsx | pureReact\n
export default () => {\n
  return <button>仅展示渲染结果</button>\n
}\n
\`\`\`\n
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
## 依赖脚本\n
\`\`\`\html\n
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js"></script>\n
\`\`\`\n

## 代码段\n
\`\`\`\jsx\n
export default () => {\n
  return <button>代码段</button>\n
}\n
\`\`\`\n

## 渲染组件\n
\`\`\`\jsx | react | var(--color-fill-2)\n
import userInfo from "user.ts";\n
export default () => {\n
  return <div className='app'>{userInfo.name}</div>\n
}\n
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
