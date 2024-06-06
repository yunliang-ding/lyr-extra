# getElementSnapshot 元素快照

## 基本使用

```tsx | react
import { getElementSnapshot } from "lyr-extra";
import { Space, Button } from "@arco-design/web-react";

export default () => {
  const { printImg, downloadImg, getDataURL, copyImg } = getElementSnapshot(
    ".arco-page-header-content"
  );
  const [base64, setBase64] = React.useState();
  return (
    <div>
      <Space>
        <Button onClick={printImg}>打印元素</Button>
        <Button
          onClick={async () => {
            await downloadImg("元素预览图");
          }}
        >
          下载图片
        </Button>
        <Button
          onClick={async () => {
            await copyImg();
          }}
        >
          一键截图
        </Button>
        <Button
          onClick={async () => {
            setBase64(await getDataURL());
          }}
        >
          获取图片DataURL
        </Button>
      </Space>
      <br />
      <br />
      {base64 && <img src={base64} style={{ width: 600 }} />}
    </div>
  );
};
```
