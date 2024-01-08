---
order: 1
title: 介绍
toc: menu
nav:
  title: 组件
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">lyr-extra</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/lyr-extra">
    <img alt="npm" src="http://center.yunliang.cloud/npm/version?package=lyr-extra">
  </a>
  <a href="https://npmmirror.com/package/lyr-extra">
    <img alt="npm" src="http://center.yunliang.cloud/npm/downloads?package=lyr-extra">
  </a>
</p>


## BigNumber.add 加法

<code src='./demo/number-add.tsx' />

## BigNumber.minus 减法

<code src='./demo/number-minus.tsx' />

## BigNumber.multiplie 乘法

<code src='./demo/number-multiplie.tsx' />

## BigNumber.divided 除法

<code src='./demo/number-divided.tsx' />

## isEmpty 判断空

```js
isEmpty('') // true
isEmpty('    ') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(null) // true
isEmpty(undefined) // true
```

## NumberFormat 金额千分位

<code src='./demo/number-format.tsx' />

## getUrlSearchParams 获取 url 参数

<code src='./demo/get-url-search-params.tsx' />


## downloadFile 下载文件

<code src='./demo/download-file.tsx' />

## copyToClipBoard 复制到剪切板

<code src='./demo/copy-to-clip-board.tsx' />

## getElementSnapshot 获取元素快照

<code src='./demo/get-element-snapshot.tsx' />

## ConsoleRender 渲染日志

- 将 console.log 打印的结果渲染成 ReactNode 输出到指定节点

- 通常在 `代码演示台` 提供日志展示功能

<code src='./demo/console-render.tsx' />

## CheckAppVersion 版本更新提示

```js
const destroy = CheckAppVersion({
  time: 3, // 3秒查一次、默认5秒轮训间隔
  text: '检测到文档内容有更新，是否刷新页面加载最新版本',
  // 获取远程资源更新的时间，当大于当前时间就会出发提示
  remoteCdnUpdateTime: async () => {
    return new Date().getTime() + 1;
  },
});
```

![](http://react-core-form.oss-cn-beijing.aliyuncs.com/assets/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230826165101.png)

## usePureRequest 解决请求竞争

<code src='./demo/use-pure-request.tsx' />

## docxReplace 替换word文档

<code src='./demo/docx-replace.tsx' />

## babelParse 编译 es6 代码片段

### 依赖 cdn

```js
https://g.alicdn.com/code/lib/babel-standalone/7.21.3/babel.min.js,
```

<code src='./demo/babel.tsx' />

### API

<API src="../src/babel-parse/type.tsx" hideTitle></API>

## MarkdownViewer 渲染 markdown

<code src='./demo/markdown-viewer.tsx' />

### API

<API src="../src/markdown-viewer/index.tsx" hideTitle></API>
