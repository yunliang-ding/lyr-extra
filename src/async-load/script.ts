export default (srcs: string | string[]) => {
  if (!Array.isArray(srcs)) {
    srcs = [srcs];
  }
  const promiseList = srcs.map((src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.crossOrigin = '';
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = (err) => {
        reject(err);
      };
    });
  });
  return Promise.all(promiseList);
};
