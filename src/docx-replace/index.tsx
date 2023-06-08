import DocxTemplater, { DXT } from 'docxtemplater';
import PizZip from 'pizzip';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface AnyObj {
  [key: string]: any;
}

export interface DocxReplaceOptions extends DXT.Options {
  /** 导出的文件名称 */
  filename?: string;
  /** 生成配置 */
  generateProps?: AnyObj;
  /** 格式限制 */
  accept?: string[];
  /** 匹配符 */
  delimiters?: { start: string; end: string };
}

/**
 * Docx字段替换
 * @description 用来替换文档内容，默认替换规则 {id} >> id;
 * @param {File} file 文件流
 * @param {AnyObj} data 数据源
 * @param {DocxReplaceOptions} options 配置项
 */
export default async (
  file: File,
  data: AnyObj,
  {
    filename = 'output',
    generateProps,
    accept,
    ...arg
  }: DocxReplaceOptions = {},
) => {
  // 校验格式
  if (accept?.length) {
    const flag = accept.some((a) => file.name.endsWith(a));
    if (!flag) {
      throw Error('格式不正确');
    }
  }
  const zip = new PizZip(await file.arrayBuffer());
  const docx = new DocxTemplater().loadZip(zip);
  docx.setOptions({
    nullGetter: () => '',
    ...arg,
  });
  docx.setData(data);
  try {
    docx.render();
  } catch (e) {
    console.log('Docx Replace Render Error', e);
    throw Error('文档渲染失败');
  }
  const out = docx.getZip().generate({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ...generateProps,
  });
  saveAs(out, filename);
};
/** 批量替换生成 zip */
export const docxReplaceBatch = async (
  files: File[],
  data: AnyObj,
  {
    filename = 'output.zip',
    generateProps,
    accept,
    ...arg
  }: DocxReplaceOptions = {},
) => {
  const jszip = JSZip();
  for (let i = 0; i < files.length; i++) {
    const file: any = files[i];
    const zip = new PizZip(await file.originFileObj.arrayBuffer());
    const docx = new DocxTemplater().loadZip(zip);
    docx.setOptions({
      nullGetter: () => '',
      ...arg,
    });
    docx.setData(data);
    try {
      docx.render();
    } catch (e) {
      console.log('Docx Replace Render Error', e);
      throw Error('文档渲染失败');
    }
    jszip.file(file.name, docx.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ...generateProps,
    }));
  }
  // 下载压缩包
  jszip.generateAsync({ type: 'blob' }).then(res => {
    saveAs(res, filename)
  })
};
