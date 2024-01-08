import React from "react";
import { downloadFile, docxReplace } from "lyr-extra";
import { Button, Space, Upload } from "@arco-design/web-react";

const data = {
  field1: "zhangsan",
  field2: "lisi",
  field3: "这是描述信息",
};

export default () => {
  const [files, setFiles]: any = React.useState([]);
  const onReplace = () => {
    docxReplace(files[0]?.originFile, data, {
      filename: "自定义文件名称",
      delimiters: {
        start: "{",
        end: "}",
      },
    });

    // 支持同时替换多个，并下载zip
    // docxReplaceBatch(files, data, {
    //   filename: '自定义文件名称.zip',
    //   delimiters: {
    //     start: '{',
    //     end: '}',
    //   },
    // });
  };

  const onDownloadDemo = () => {
    downloadFile(
      "http://react-core-form.oss-cn-beijing.aliyuncs.com/assets/demo.docx",
      "demo.docx"
    );
  };

  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <Space>
        <Button onClick={onReplace} disabled={!files?.length} type="primary">
          替换
        </Button>
        <Button onClick={onDownloadDemo}>下载文件模版</Button>
      </Space>
      <Upload
        limit={1}
        accept=".docx"
        onChange={(fileList) => {
          setFiles(fileList);
        }}
      >
        <Button>上传替换的文档</Button>
      </Upload>
    </Space>
  );
};
