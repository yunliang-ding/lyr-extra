import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from 'react';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import less from 'react-syntax-highlighter/dist/esm/languages/prism/less';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { babelParse } from '..';
import ComponentWrap from './component-wrap';
import SyntaxLighter from './syntax-lighter';
import { Table, Tag } from '@arco-design/web-react';
import './index.less';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('bash', bash);

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
  /** 依赖的源码 */
  source?: any;
  /** 类型数据源 */
  types?: any;
}

export default forwardRef(
  (
    {
      content,
      require = {},
      codeTheme = '',
      source = {},
      types = {},
    }: MarkDownViewerProps,
    ref,
  ) => {
    const slRef: any = useRef([]);
    const [spin, setSpin] = useState(true);
    const navs: any = useMemo(() => [], [content]);
    useEffect(() => {
      setTimeout(() => {
        setSpin(false);
      }, 100);
    }, []);
    useImperativeHandle(ref, () => {
      return {
        setTheme: (theme: string) => {
          slRef.current.forEach((fn: any) => {
            fn?.(theme);
          });
        },
        getNavs: () => {
          return navs;
        },
      };
    });
    return spin ? null : (
      <div className="markdown-viewer" style={{ position: 'relative' }}>
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
                      position: 'relative',
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
              const title = (children[0] as string).replaceAll(' ', '');
              navs.push(title);
              return (
                <h2 className="markdown-viewer-h2" id={title}>
                  {children}
                </h2>
              );
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
              return (
                <div className="markdown-viewer-blockquote">{children}</div>
              );
            },
            pre({ children }) {
              return <div className="markdown-viewer-pre">{children}</div>;
            },
            code({ node, inline, className, children, ...props }) {
              const [theme, setTheme] = useState(codeTheme);
              useEffect(() => {
                slRef.current.push(setTheme);
              }, []);
              // 渲染 React 组件
              if ((node?.data?.meta as string)?.startsWith?.('| react')) {
                const style: any = {};
                const splitString = (node?.data?.meta as string).split?.(' | ');
                if (splitString.length > 1) {
                  style.backgroundColor = splitString[1];
                }
                if (splitString.length > 1) {
                  style.backgroundColor = splitString[1];
                }
                return (
                  <ComponentWrap
                    code={children[0]}
                    require={require}
                    codeTheme={theme}
                    style={style}
                    source={source}
                    expand={(node?.data?.meta as string)?.startsWith?.(
                      '| reactExpand',
                    )}
                  />
                );
              }
              // 仅 渲染 React 组件
              if ((node?.data?.meta as string)?.startsWith?.('| pureReact')) {
                const Comp = babelParse({
                  code: (children[0] as string).replaceAll('\n', ''),
                  require,
                });
                const style: any = {};
                const splitString = (node?.data?.meta as string).split?.(' | ');
                if (splitString.length > 1) {
                  style.backgroundColor = splitString[1];
                }
                return <Comp />;
              }
              const match = /language-(\w+)/.exec(className || '');
              const code = String(children).replace(/\n$/, '');
              // 渲染API表格
              if (match?.[1] === 'API') {
                const data =
                  types[(children[0] as string).replaceAll('\n', '')];
                return (
                  <Table
                    pagination={false}
                    data={data}
                    border
                    columns={[
                      {
                        title: '属性名',
                        dataIndex: 'name',
                        width: 160,
                      },
                      {
                        title: '描述',
                        dataIndex: 'description',
                        width: 180,
                      },
                      {
                        title: '类型',
                        dataIndex: 'type',
                        render(type) {
                          return (
                            <code
                              style={{
                                padding: '2px 5px',
                                color: '#d56161',
                                background: ' #f0f4f8',
                                borderRadius: 2,
                              }}
                            >
                              {type}
                            </code>
                          );
                        },
                      },
                      {
                        title: '默认值',
                        dataIndex: 'defaultValue',
                        width: 120,
                        render(defaultValue) {
                          return defaultValue ? (
                            <code
                              style={{
                                padding: '2px 5px',
                                color: '#d56161',
                                background: ' #f0f4f8',
                                borderRadius: 2,
                              }}
                            >
                              {defaultValue}
                            </code>
                          ) : (
                            '-'
                          );
                        },
                      },
                      {
                        title: '是否必选',
                        dataIndex: 'required',
                        width: 100,
                        align: "right",
                        render(required) {
                          return required ? (
                            <Tag color="#35cd4b" size="small">是</Tag>
                          ) : (
                            <Tag color="#fdbc40" size="small">否</Tag>
                          );
                        },
                      },
                    ]}
                  />
                );
              }
              return !inline && match ? (
                <div style={{ position: 'relative' }}>
                  <SyntaxLighter
                    codeTheme={theme}
                    code={code}
                    language={match[1]}
                    {...props}
                  />
                </div>
              ) : (
                <code
                  style={{
                    padding: '2px 5px',
                    color: '#d56161',
                    background: ' #f0f4f8',
                    borderRadius: 2,
                  }}
                >
                  {children}
                </code>
              );
            },
            table({ children }) {
              return (
                <table className="markdown-viewer-table">{children}</table>
              );
            },
          }}
        >
          {content}
        </ReactMarkDown>
      </div>
    );
  },
);
