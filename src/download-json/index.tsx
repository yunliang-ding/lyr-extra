export default (json: any, fileName = 'demo.json') => {
  const jsonStr = json instanceof Object ? JSON.stringify(json, null, 2) : json;
  const url: any = window.URL || window.webkitURL || window;
  const blob = new Blob([jsonStr]);
  const a: any = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a',
  );
  a.href = url.createObjectURL(blob);
  a.download = fileName;
  a.click();
};
