import react from 'react';
import ReactDOM from 'react-dom';
import { Interpreter } from 'eval5';

class BabelCompile {
  scope: any = {};
  exports = {};
  onRequire: any;
  constructor(scope = {}, onRequire?) {
    this.scope = {
      react,
      'react-dom': ReactDOM,
      ...scope,
    };
    this.onRequire = onRequire;
  }
  require = (key: string) => {
    if (this.scope[key] === undefined) throw new Error(`${key} is not define`);
    this.onRequire?.(key);
    return this.scope[key];
  };
  excuteCode = (code: string): any => {
    const res: any = {
      isError: false,
      error: '',
      exports: {},
    };
    try {
      // 采用 eval5 的包
      const interpreter = new Interpreter(window);
      interpreter.evaluate(this.getES5Code(code))(this.require, this.exports);
      res.exports = this.exports;
    } catch (error) {
      console.log('catch run evaluate error:', error);
      throw error;
    }
    return res;
  };
  getES5Code = (code: string): any => {
    const { transform } = (window as any).Babel;
    try {
      const es5 = transform(code, {
        presets: ['env', 'react', 'typescript'],
        filename: "main.tsx"
      }).code;
      return transform(
        `(require, exports) => {
          ${es5};
        }`,
        {
          presets: ['env', 'react'],
        },
      ).code;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
  };
}
export default BabelCompile;
