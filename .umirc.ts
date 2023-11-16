import { defineConfig } from 'dumi';

export default defineConfig({
  title: '工具集',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true, // 样式按需加载
      },
    ],
  ],
  scripts: [
    'https://g.alicdn.com/code/lib/babel-standalone/7.21.2/babel.min.js',
  ],
  history: { type: 'hash' },
  hash: false,
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/yunliang-ding/react-core-form',
    },
  ],
  // more config: https://d.umijs.org/config
});
