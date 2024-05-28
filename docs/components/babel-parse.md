## 编译 tsx 代码片段

### 基本使用

```tsx | react
import { babelParse } from "lyr-extra";

const code = `interface UserProps{
  name: string
};

export default (props: UserProps) => {
  return <button>{props.name}</button>
}
`;
export default () => {
  const Comp = babelParse({
    code,
  });
  return <Comp name="Hello World" />;
};
```

### 注入依赖

```tsx | react
import { babelParse } from "lyr-extra";

const code = `import user from "user";

export default (props) => {
  return <button>{user.name}</button>
}
`;
export default () => {
  const Comp = babelParse({
    code,
    require: {
      user: {
        name: "zhangsan",
      },
    },
  });
  return <Comp />;
};
```


## API

```ts
export interface babelParseProps {
  /**
   * es6 module 代码片段
   */
  code: string;
  /**
   * 自动添加 import
   * @default { React: 'react'}
   */
  dependencies?: Object;
  /**
   * 是否采用默认导出解析
   * @default true
   */
  exportDefault?: boolean;
  /** 第三方依赖 */
  require?: Object;
}
```