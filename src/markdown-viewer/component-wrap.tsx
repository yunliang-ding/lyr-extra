import { useMemo, useState } from 'react';
import { Tabs, Tooltip } from '@arco-design/web-react';
import SyntaxHighlight from './syntax-highlight';
import { babelParse } from '..';

export default ({
  style = {},
  extraRender,
  code,
  source = {},
  expand = false,
  require,
}) => {
  const needSource = {};
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
        {extraRender({ tabs, code })}
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
