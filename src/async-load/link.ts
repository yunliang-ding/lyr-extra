export default (hrefs: string | string[]) => {
  if (!Array.isArray(hrefs)) {
    hrefs = [hrefs];
  }
  const promiseList = hrefs.map((href) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      link.onload = () => {
        resolve(true);
      };
      link.onerror = (err) => {
        reject(err);
      };
    });
  });
  return Promise.all(promiseList);
};
