/* eslint-disable */
import { isEmpty } from '..';
import BabelCompile from './compile';
import { babelParseProps } from './type';
/**
 * 解析
 */
export default ({
  code = '',
  // 默认依赖 react
  dependencies = {
    React: 'react',
  },
  require = {},
  onRequire = () => null,
}: babelParseProps) => {
  const babel = new BabelCompile(require, onRequire);
  try {
    let dependenciesString = '';
    if (!isEmpty(dependencies)) {
      dependenciesString =
        Object.keys(dependencies)
          .map((key) => {
            return `import ${key} from '${dependencies[key]}';`;
          })
          .join('\n') + '\n';
    }
    return babel.excuteCode(
      `${dependenciesString}${code.replaceAll('↵', '')}`,
    );
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};
