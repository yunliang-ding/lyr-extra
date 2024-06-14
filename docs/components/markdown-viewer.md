# MarkdownViewer 解析 md

## 基本使用

```tsx | react
import { MarkdownViewer } from 'lyr-extra';

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
3. 描述3（\`强调说明\`）
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
`}
    />
  );
};
```

## 渲染 React 组件

```tsx | react
import { MarkdownViewer } from 'lyr-extra';
import * as ArcoDesign from '@arco-design/web-react';

const treeData = [
  {
    title: 'root',
    key: '0-0',
    children: [
      {
        title: 'src',
        key: '0-0-2',
        children: [
          {
            title: 'components',
            key: '0-0-2-1',
            children: [
              {
                title: 'loading.tsx',
                key: '0-0-2-1-0',
              },
            ],
          },
          {
            title: 'app.tsx',
            key: '0-0-2-2',
          },
          {
            title: 'app.less',
            key: '0-0-2-3',
          },
        ],
      },
    ],
  },
  {
    title: 'lyr.config.ts',
    key: '0-1',
  },
];

export default () => {
  return (
    <MarkdownViewer
      source={{
        'treeData.ts': `export default ${JSON.stringify(treeData, null, 2)}`,
      }}
      require={{
        '@arco-design/web-react': ArcoDesign,
        'treeData.ts': treeData,
      }}
      content={`
## 渲染组件
\`\`\`\jsx | react | var(--color-fill-2)
import { Tree } from '@arco-design/web-react';
import treeData from "treeData.ts";

export default () => {
  return <Tree
    treeData={treeData}
    autoExpandParent
    showLine
  />
}
`}
    />
  );
};
```

## 展示 React 组件

```tsx | react
import { MarkdownViewer } from 'lyr-extra';

export default () => {
  const user = { name: 'zhangsan', age: 12 };
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

## 渲染 API 组件类型

```tsx | react
import { MarkdownViewer } from 'lyr-extra';

export default () => {
  return (
    <MarkdownViewer
      types={{
        '/src/demo/type.tsx': [
          {
            name: 'leastOne',
            required: false,
            type: 'boolean',
            defaultValue: 'false',
            description: '最少一条',
          },
          {
            name: 'value',
            required: true,
            type: 'any[]',
            defaultValue: '[]',
            description: '数据源',
          },
          {
            name: 'onChange',
            required: false,
            type: 'Function',
            defaultValue: '() => null',
            description: '改变的钩子',
          },
          {
            name: 'removeConfirm',
            required: false,
            type: 'boolean',
            defaultValue: 'false',
            description: '是否开启删除确认',
          },
        ],
      }}
      content={`
## 类型描述
\`\`\`API
/src/demo/type.tsx
\`\`\`
`}
    />
  );
};
```

## 切换代码主题

```tsx | react
import { MarkdownViewer } from 'lyr-extra';

const user = { name: 'zhangsan', age: 12 };

export default () => {
  const mdRef = React.useRef({});
  return (
    <div>
      <button
        onClick={() => {
          mdRef.current.setTheme('dark');
        }}
      >
        dark 主题
      </button>
      &nbsp; &nbsp;&nbsp;
      <button
        onClick={() => {
          mdRef.current.setTheme('light');
        }}
      >
        light 主题
      </button>
      <MarkdownViewer
        ref={mdRef}
        source={{
          'user.ts': `export default ${JSON.stringify(user, null, 2)}`,
        }}
        require={{
          'user.ts': user,
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

## 自动展开代码
\`\`\`\jsx | reactExpand | var(--color-fill-2)
import userInfo from "user.ts";

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
