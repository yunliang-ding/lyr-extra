## MarkdownViewer 解析 md

### 基本使用

```tsx | react
import { MarkdownViewer } from "lyr-extra";

export default () => {
  const [codeTheme, setCodeTheme] = React.useState("dark");
  return (
    <div>
      <button
        onClick={() => {
          setCodeTheme(codeTheme === "dark" ? "light" : "dark");
        }}
      >
        切换代码主题
      </button>
      <MarkdownViewer
        codeTheme={codeTheme}
        content={`
# 一级标题\n
## 二级标题\n
### 三级标题\n
> 区块信息\n
1. 描述1\n
2. 描述2\n
3. 描述3\n
### 代码块\n
\`\`\`\jsx\n
export default () => {\n
  return <div className='app'>代码块</div>\n
}\n
\`\`\`\n
### 组件解析\n
\`\`\`\jsx | react | #f5f5f5\n
export default () => {\n
  return <div className='app'>我是渲染结果</div>\n
}\n
\`\`\`\n
### 数据表格\n
|学号|姓名|年龄|地址|\n
|----|----|----|----|\n
|1|\`\`\`张三\`\`\`|20|地址地址地址|\n
|2|李四|18|地址地址地址|\n
|3|王五|23|地址地址地址|\n
`}
      />
    </div>
  );
};
```
