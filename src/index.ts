export { default as uuid } from './uuid';
export { default as isEmpty } from './is-empty';
export { default as BigNumber } from './big-number';
export { default as NumberFormat } from './number-format';
export { default as getUrlSearchParams } from './get-url-search-params';
export { default as downloadFile } from './download-file';
export { default as downloadJson } from './download-json';
export { default as copyToClipBoard } from './copy-to-clip-board';
export { default as getElementSnapshot } from './element-snapshot';
export { default as ConsoleRender } from './console-render';
export { default as docxReplace } from './docx-replace';
export { default as docxReplaceBatch } from './docx-replace';
export { default as babelParse } from './babel-parse';
export { default as babelParseCode } from './babel-parse/parse';
export { default as MarkdownViewer } from './markdown-viewer';
export { default as asyncLoadScript } from './async-load/script';
export { default as asyncLoadLink } from './async-load/link';
export { default as ReactPlayground } from './react-playground';

export const encode = (str) => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};
export const decode = (str) => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};
