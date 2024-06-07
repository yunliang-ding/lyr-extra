export interface babelParseProps {
  /**
   * es6 module 代码片段
   */
  code: string;
  /**
   * 自动添加 import
   * @default { React: 'react'}
   */
  dependencies?: Object;
  /** 第三方依赖 */
  require?: Object;
  onRequire?(key: string): void;
}
