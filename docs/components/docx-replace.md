# docxReplace 替换 word 文档

## 基本使用

```tsx | react
import { downloadFile, docxReplace } from "lyr-extra";
import { Button } from "@arco-design/web-react";

const data = {
  field1: "zhangsan",
  field2: "lisi",
  field3: "这是描述信息",
};

export default () => {
  const [files, setFiles] = React.useState([]);
  const onReplace = () => {
    docxReplace(files[0], data, {
      filename: "自定义文件名称",
      delimiters: {
        start: "{",
        end: "}",
      },
    });
  };
  const onDownloadDemo = () => {
    downloadFile(
      "//react-core-form.oss-cn-beijing.aliyuncs.com/assets/demo.docx",
      "demo.docx"
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 10, gap: 10, display: "flex" }}>
        <Button onClick={onReplace} disabled={!files?.length} type="primary">
          替换
        </Button>
        <Button onClick={onDownloadDemo}>下载文件模版</Button>
      </div>
      <input
        type="file"
        accept=".docx"
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
    </div>
  );
};
```

## 支持同时替换多个，并下载 zip

```ts
docxReplaceBatch(files, data, {
  filename: "自定义文件名称.zip",
  delimiters: {
    start: "{",
    end: "}",
  },
});
```
