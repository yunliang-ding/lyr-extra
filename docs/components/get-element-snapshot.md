# getElementSnapshot 元素快照

## 基本使用

```tsx | react
import { getElementSnapshot } from "lyr-extra";

export default () => {
  const { printImg, downloadImg, getDataURL, copyImg } = getElementSnapshot(
    ".arco-page-header-content"
  );
  const [base64, setBase64] = React.useState();
  return (
    <div>
      <div>
        <button onClick={printImg}>打印元素</button>
        <button
          onClick={async () => {
            await downloadImg("元素预览图");
          }}
        >
          下载图片
        </button>
        <button
          onClick={async () => {
            await copyImg();
          }}
        >
          一键截图
        </button>
        <button
          onClick={async () => {
            setBase64(await getDataURL());
          }}
        >
          获取图片DataURL
        </button>
      </div>
      <br />
      <br />
      {base64 && <img src={base64} style={{ width: 600 }} />}
    </div>
  );
};
```
