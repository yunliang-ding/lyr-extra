---
order: 1
title: 介绍
toc: menu
nav:
  title: 组件
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">react-core-form-tools</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/react-core-form-tools">
    <img alt="npm" src="https://npmmirror.com/badge/v/react-core-form-tools.svg?version=0.0.2">
  </a>
  <a href="https://npmmirror.com/package/react-core-form-tools">
    <img alt="NPM downloads" src="https://npmmirror.com/badge/d/react-core-form-tools.svg">
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

## usePureRequest 解决请求竞争

<code src='./demo/use-pure-request.tsx' />
