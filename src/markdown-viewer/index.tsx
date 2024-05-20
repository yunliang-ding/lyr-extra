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
  console.log("content", content);
  return spin ? null : (
    <div className="markdown-viewer">
      <ReactMarkDown
        remarkPlugins={[remarkGfm]}
        components={{
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
          code({ node, inline, className, children, ...props }) {
            // 仅渲染代码
            if (node?.data?.meta === "| react") {
              // 渲染 React 组件
              const Comp = babelParse({
                code: (children[0] as string).replaceAll("\n", ""),
                require,
              });
              return (
                <CodeWrap code={children[0]} codeTheme={codeTheme}>
                  <Comp />
                </CodeWrap>
              );
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
