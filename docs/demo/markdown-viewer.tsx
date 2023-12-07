import React from "react";
import { Button } from "@arco-design/web-react";
import { MarkdownViewer } from "react-core-form-tools";

export default () => {
  const [codeTheme, setCodeTheme] = React.useState("dark");
  return (
    <div>
      <Button
        onClick={() => {
          setCodeTheme(codeTheme === "dark" ? "light" : "dark");
        }}
      >
        切换代码主题
      </Button>
      <MarkdownViewer
        codeTheme={codeTheme}
        content={`
# 一级标题

## 二级标题

### 三级标题

> 区块信息

**重点描述信息**

1. 描述1
2. 描述2
3. 描述3

### 代码块

\`\`\`\jsx
import React from 'react';

export default () => {
  return <div className='app'>react</div>
}
\`\`\`

### 数据表格

|学号|姓名|年龄|地址|
|----|----|----|----|
|1|\`\`\`张三\`\`\`|20|地址地址地址|
|2|李四|18|地址地址地址|
|3|王五|23|地址地址地址|

`}
      />
    </div>
  );
};
