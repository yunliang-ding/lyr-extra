## lyr-extra

> 由于工具库依赖了部分第三方库，体积比较大，所以只打包了 umd 版本

```html
<!-- window.lyrExtra -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js"></script>
```

## 前提需要引入 cdn 前置依赖 到 window

```html
<!-- window.React -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js"></script>
<!-- window.ReactDOM -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js"></script>
<!-- window.jsxRuntime -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js"></script>
<!-- window.html2canvas -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/html2canvas.min.js"></script>
<!-- window.JSZip -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jszip.min.js"></script>
<!-- window.Babel -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js"></script>
```

- BigNumber 解决精度问题

- isEmpty 判断常规空

- NumberFormat 金额千分位

- getUrlSearchParams 获取 url 参数

- downloadFile 下载文件

- copyToClipBoard 复制到剪切板

- getElementSnapshot 获取元素快照

- ConsoleRender 渲染日志

- CheckAppVersion 版本更新提示

- docxReplace 替换 word 文档

- babelParse 编译 es6 代码片段

- MarkdownViewer 渲染 md 文件
