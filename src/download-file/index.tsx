/** 文件下载 */
export default (url: string, fileName: string) => {
  return new Promise((res) => {
    const x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    x.onload = () => {
      const loadurl = window.URL.createObjectURL(x.response);
      const a = document.createElement('a');
      a.href = loadurl;
      a.download = fileName;
      a.click();
      res(true);
    };
    x.send();
  });
};
