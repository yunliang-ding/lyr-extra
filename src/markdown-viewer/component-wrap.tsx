import { useMemo, useState } from 'react';
import { Tabs, Tooltip } from '@arco-design/web-react';
import SyntaxHighlight from './syntax-highlight';
import { babelParse, encode } from '..';

export default ({ style = {}, code, source = {}, expand = false, require }) => {
  const needSource = {}
  const [expandCode, setExpandCode] = useState(expand);
  const tabs = useMemo(() => ['index.tsx'], []);
  const Comp = useMemo(() => {
    return babelParse({
      code,
      require,
      onRequire: (requireName: string) => {
        if (requireName.endsWith('.ts') || requireName.endsWith('.tsx')) {
          if (!tabs.includes(requireName)) {
            tabs.push(requireName);
            needSource[requireName] = source[requireName];
          }
        }
      },
    });
  }, []);
  let VNode = null;
  try {
    VNode = Comp();
  } catch (error) {
    VNode = <pre style={{ color: 'red', margin: 0 }}>{String(error)}</pre>;
  }
  return (
    <div className="markdown-viewer-code-wrap">
      <div className="markdown-viewer-code-wrap-body" style={style}>
        {VNode}
      </div>
      <div className="markdown-viewer-code-wrap-extra">
        <Tooltip content="查看代码">
          <svg
            viewBox="0 0 1024 1024"
            width="18"
            height="18"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setExpandCode(!expandCode);
            }}
          >
            <path
              d="M153.770667 517.558857l200.387047-197.241905L302.86019 268.190476 48.761905 518.290286l254.439619 243.614476 50.590476-52.833524-200.021333-191.512381zM658.285714 320.316952L709.583238 268.190476l254.098286 250.09981L709.241905 761.904762l-50.590476-52.833524 200.021333-191.512381L658.285714 320.316952z m-112.981333-86.186666L393.99619 785.554286l70.534096 19.358476 151.30819-551.399619-70.534095-19.358476z"
              fill="#8a8a8a"
            />
          </svg>
        </Tooltip>
        <Tooltip content="打开 Playground ">
          <svg
            viewBox="0 0 1024 1024"
            width="16"
            height="16"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const params = encode(JSON.stringify({
                tabs,
                code,
                source: needSource
              }));
              window.open(`${location.pathname}#/~playground?params=${params}`);
            }}
          >
            <path
              d="M665.088 131.584L354.304 415.744 220.16 314.368c-11.264-8.704-27.136-8.192-38.4 0.512L133.12 354.304c-14.848 11.776-15.36 34.304-1.536 47.104L250.88 510.464 131.584 619.52c-14.336 12.8-13.312 35.328 1.536 47.104l48.64 39.424c11.264 9.216 27.136 9.216 38.4 0.512l134.144-101.376 310.784 284.672c17.92 16.384 44.032 19.456 65.536 8.192l147.968-79.36c18.432-9.728 30.208-29.184 30.208-50.176V252.928c0-20.992-11.776-40.448-30.208-50.176l-147.968-79.36c-21.504-11.264-47.616-8.192-65.536 8.192z m-185.856 378.88l233.984-177.152v354.816L479.232 510.464z"
              fill="#8a8a8a"
            />
          </svg>
        </Tooltip>
      </div>
      {expandCode && (
        <div className="markdown-viewer-code-wrap-footer">
          <Tabs>
            {tabs.map((tab, index) => {
              return (
                <Tabs.TabPane key={tab} title={tab}>
                  <SyntaxHighlight
                    code={index === 0 ? code : source[tab]}
                    language="jsx"
                  />
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      )}
    </div>
  );
};
