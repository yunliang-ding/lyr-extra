/** 解析url参数 */
export default (search = '') => {
  search = search?.split('?')[1];
  const params = {};
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
