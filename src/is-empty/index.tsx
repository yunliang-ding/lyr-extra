/** 判断空 */
export default (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === "string") {
    return param.trim() === "";
  }
  if (typeof param === "object") {
    return Object.keys(param).length === 0;
  }
  return false;
};