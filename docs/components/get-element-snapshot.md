# getElementSnapshot 元素快照

## 基本使用

```tsx | react
import { getElementSnapshot } from 'lyr-extra';
import { Space, Button, Table } from '@arco-design/web-react';

export default () => {
  const { printImg, downloadImg, getDataURL, copyImg } = getElementSnapshot(
    '.arco-table-demos',
  );
  const [base64, setBase64] = React.useState();
  return (
    <div>
      <Space>
        <Button onClick={printImg}>打印元素</Button>
        <Button
          onClick={async () => {
            await downloadImg('元素预览图');
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
      <div>
        <Table
          className="arco-table-demos"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Salary',
              dataIndex: 'salary',
            },
            {
              title: 'Address',
              dataIndex: 'address',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
          ]}
          data={[
            {
              key: '1',
              name: 'Jane Doe',
              salary: 23000,
              address: '32 Park Road, London',
              email: 'jane.doe@example.com',
            },
            {
              key: '2',
              name: 'Alisa Ross',
              salary: 25000,
              address: '35 Park Road, London',
              email: 'alisa.ross@example.com',
            },
            {
              key: '3',
              name: 'Kevin Sandra',
              salary: 22000,
              address: '31 Park Road, London',
              email: 'kevin.sandra@example.com',
            },
            {
              key: '4',
              name: 'Ed Hellen',
              salary: 17000,
              address: '42 Park Road, London',
              email: 'ed.hellen@example.com',
            },
            {
              key: '5',
              name: 'William Smith',
              salary: 27000,
              address: '62 Park Road, London',
              email: 'william.smith@example.com',
            },
          ]}
        />
      </div>
      <br />
      <br />
      {base64 && <img src={base64} style={{ width: 600 }} />}
    </div>
  );
};
```
