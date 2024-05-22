import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { babelParse } from "..";
import CodeWrap from "./code-wrap";
import SyntaxLighter from "./syntax-lighter";
import "./index.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("tsx", tsx);

export interface MarkDownViewerProps {
  /** 文件内容 */
  content: string;
  /**
   * 代码主题色
   * @default dark
   */
  codeTheme?: string;
  /** 解析 React 组件的依赖 */
  require?: any;
}

export default ({
  content,
  require = {},
  codeTheme = "",
}: MarkDownViewerProps) => {
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    // 延迟渲染，解决主题渲染问题
    setTimeout(() => {
      setSpin(false);
    }, 500);
  }, []);
  return spin ? null : (
    <div className="markdown-viewer">
      <ReactMarkDown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ children, href }) {
            return (
              <a target="_blank" href={href}>
                {children}
                <svg
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  style={{
                    position: "relative",
                    top: 3,
                    marginLeft: 4,
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  ></path>
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  ></polygon>
                </svg>
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="markdown-viewer-h1">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="markdown-viewer-h2">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="markdown-viewer-h3">{children}</h3>;
          },
          ol({ children }) {
            return <ol className="markdown-viewer-ol">{children}</ol>;
          },
          ul({ children }) {
            return <ul className="markdown-viewer-ul">{children}</ul>;
          },
          li({ children }) {
            return <li className="markdown-viewer-li">{children}</li>;
          },
          strong({ children }) {
            return <div className="markdown-viewer-strong">{children}</div>;
          },
          blockquote({ children }) {
            return <div className="markdown-viewer-blockquote">{children}</div>;
          },
          pre({ children }) {
            return <div className="markdown-viewer-pre">{children}</div>;
          },
          code({ node, inline, className, children, ...props }) {
            // 渲染 React 组件
            if ((node?.data?.meta as string)?.startsWith?.("| react")) {
              const Comp = babelParse({
                code: (children[0] as string).replaceAll("\n", ""),
                require,
              });
              const style: any = {};
              const splitString = (node?.data?.meta as string).split?.(" | ");
              if (splitString.length > 1) {
                style.backgroundColor = splitString[1];
              }
              return (
                <CodeWrap
                  code={children[0]}
                  codeTheme={codeTheme}
                  style={style}
                >
                  <Comp />
                </CodeWrap>
              );
            }
            // 仅 渲染 React 组件
            if((node?.data?.meta as string)?.startsWith?.("| pureReact")){
              const Comp = babelParse({
                code: (children[0] as string).replaceAll("\n", ""),
                require,
              });
              const style: any = {};
              const splitString = (node?.data?.meta as string).split?.(" | ");
              if (splitString.length > 1) {
                style.backgroundColor = splitString[1];
              }
              return <Comp />
            }
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <div style={{ position: "relative" }}>
                <SyntaxLighter
                  codeTheme={codeTheme}
                  code={code}
                  language={match[1]}
                  {...props}
                />
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return <table className="markdown-viewer-table">{children}</table>;
          },
        }}
      >
        {content}
      </ReactMarkDown>
    </div>
  );
};
