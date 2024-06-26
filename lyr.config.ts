import { defineConfig } from 'lyr';

export default defineConfig({
  title: 'lyr-extra',
  favicon: 'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico',
  link: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/monaco-file-icon.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-object-viewer.min.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-console.min.css',
  ],
  devScript: [
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/shiki.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/aliyun-oss-sdk.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/html2canvas.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jszip.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-object-viewer.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-console.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-markdown.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js',
  ],
  buildScript: [
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/shiki.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/aliyun-oss-sdk.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/track.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/html2canvas.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jszip.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-object-viewer.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/luna-console.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-markdown.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js',
  ],
  webpackConfig: () => {
    return {
      externals: {
        html2canvas: 'html2canvas',
        jszip: 'JSZip',
        'react-markdown': 'ReactMarkdown.default',
      },
    };
  },
  serverPath: '/apis',
  docsRequire: {
    ArcoDesign: '@arco-design/web-react',
    lyrComponent: 'lyr-component',
  },
  menus: [
    {
      label: '介绍',
      path: '/',
    },
    {
      label: '组件',
      path: '/components',
      children: [
        {
          label: 'asyncLoad',
          path: '/components/async-load',
        },
        {
          label: 'BigNumber',
          path: '/components/big-number',
        },
        {
          label: 'babelParse',
          path: '/components/babel-parse',
        },
        {
          label: 'ConsoleRender',
          path: '/components/console-render',
        },
        {
          label: 'copyToClipBoard',
          path: '/components/copy-to-clip-board',
        },
        {
          label: 'docxReplace',
          path: '/components/docx-replace',
        },
        {
          label: 'downloadFile',
          path: '/components/download-file',
        },
        {
          label: 'getElementSnapshot',
          path: '/components/get-element-snapshot',
        },
        {
          label: 'getUrlSearchParams',
          path: '/components/get-url-search-params',
        },
        {
          label: 'MarkdownViewer',
          path: '/components/markdown-viewer',
        },
        {
          label: 'ReactPlayground',
          path: '/components/react-playground',
        },
      ],
    },
  ],
});
