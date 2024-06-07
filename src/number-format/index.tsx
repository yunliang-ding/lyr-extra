/** 千分位，小数点2位 */
export default (
  number: any,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
) => {
  if (isNaN(Number.parseFloat(number))) {
    return '-';
  }
  return Number(number).toLocaleString('zh-CH', options);
};
