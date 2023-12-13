import { defineConfig } from "dumi";

export default defineConfig({
  title: "工具集",
  favicon:
    "https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico",
  logo: "https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico",
  outputPath: "docs-dist",
  theme: {
    "@c-primary": "#165dff",
  },
  styles: [
    `
    div,
    span,
    td,
    th,
    a,
    button,
    p,
    label {
      font-size: 12px;
      font-weight: 500;
    }
    h2{
      font-size: 18px !important;
    }
    li, input, label{
      font-weight: 500 !important;
      font-size: 12px !important;
    }
    .__dumi-default-menu-list
      > li
      > a {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .__dumi-default-menu-list
      > a
      > span {
        font-size: 12px;
      }
  `,
  ],
  links: [
    {
      href: "https://unpkg.com/@arco-design/web-react@latest/dist/css/arco.min.css",
      rel: "stylesheet",
    },
  ],
  scripts: [
    "https://g.alicdn.com/code/lib/babel-standalone/7.21.2/babel.min.js",
  ],
  history: { type: "hash" },
  hash: false,
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: "GitHub",
      path: "https://github.com/yunliang-ding/react-core-form-tools",
    },
  ],
  // more config: https://d.umijs.org/config
});
