import react from 'react';
import ReactDOM from 'react-dom';

class BabelCompile {
  scope: any = {};
  exports = {
    default: undefined,
  };
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
    try {
      new Function('require', 'exports', this.getES5Code(code))(
        this.require,
        this.exports,
      );
      return this.exports?.default ? this.exports?.default : this.exports;
    } catch (error) {
      console.log('catch run es5 code error:', error);
      throw error;
    }
  };
  getES5Code = (code: string): any => {
    const { transform } = (window as any).Babel;
    try {
      const es5 = transform(code, {
        presets: ['env', 'react', 'typescript'],
        filename: 'main.tsx',
      }).code;
      // 这里需要将 es5 代码包一下作为iife
      return `((require, exports) => {
        ${es5};
      })(require, exports)`;
    } catch (error) {
      console.log('catch transform es5 error:', error);
      throw error;
    }
  };
}
export default BabelCompile;
