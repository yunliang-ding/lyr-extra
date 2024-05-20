/**
 * 简易uuid
 */
export default (size: number) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};
