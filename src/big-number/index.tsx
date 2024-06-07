import * as BigNumberJS from 'bignumber.js';

const calculate = (
  args: any[],
  type: 'plus' | 'minus' | 'multipliedBy' | 'dividedBy',
) => {
  return Number(
    args
      .reduce((a, b) => {
        return new BigNumberJS.BigNumber(a)[type](new BigNumberJS.BigNumber(b));
      })
      .toString(),
  );
};

/** 浮点数运算 */
export default {
  /** 加 */
  add: (...args: any[]) => calculate(args, 'plus'),
  /** 减 */
  minus: (...args: any[]) => calculate(args, 'minus'),
  /** 乘 */
  multiplie: (...args: any[]) => calculate(args, 'multipliedBy'),
  /** 除 */
  divided: (...args: any[]) => calculate(args, 'dividedBy'),
};
