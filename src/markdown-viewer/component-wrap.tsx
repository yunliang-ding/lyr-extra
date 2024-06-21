import { useEffect, useMemo, useState } from 'react';
import { Tooltip } from '@arco-design/web-react';
import MonacoEditor from './monaco-editor';
import { babelParse } from '..';

export default ({ style = {}, code, source = {}, expand = false, require }) => {
  const [expandEditor, setExpandEditor] = useState(expand);
  const [reset, setReset] = useState(Math.random());
  const [reload, setReload] = useState(Math.random());
  const [innerCode] = useState({ value: code });
  const [innerSourceCode] = useState({ value: source });
  const [updateRequire] = useState({});
  const tabs = useMemo(() => ['index.tsx'], []);
  const Comp = useMemo(
    () => {
    console.log(innerCode.value)
      return babelParse({
        code: innerCode.value,
        require: {
          ...require,
          ...updateRequire,
        },
        onRequire: (requireName: string) => {
          if (requireName.endsWith('.ts') || requireName.endsWith('.tsx')) {
            if (!tabs.includes(requireName)) {
              tabs.push(requireName);
            }
          }
        },
      })
    },
    [reload],
  );
  useEffect(() => {
    innerCode.value = code;
    innerSourceCode.value = source;
    tabs.forEach((tab) => {
      delete updateRequire[tab];
    });
    setReload(Math.random());
  }, [reset]);
  let VNode = null;
  try {
    VNode = Comp();
  } catch (error) {
    VNode = <pre style={{ color: 'red', margin: 0 }}>{String(error)}</pre>;
  }
  return (
    <div className="markdown-viewer-code-wrap">
      <div className="markdown-viewer-code-wrap-body" style={style} key={reload}>
        {VNode}
      </div>
      <div className="markdown-viewer-code-wrap-extra">
        <Tooltip content="编辑代码可实时预览">
          <svg
            viewBox="0 0 1024 1024"
            width="16"
            height="16"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setExpandEditor(!expandEditor);
            }}
          >
            <path
              d="M665.088 131.584L354.304 415.744 220.16 314.368c-11.264-8.704-27.136-8.192-38.4 0.512L133.12 354.304c-14.848 11.776-15.36 34.304-1.536 47.104L250.88 510.464 131.584 619.52c-14.336 12.8-13.312 35.328 1.536 47.104l48.64 39.424c11.264 9.216 27.136 9.216 38.4 0.512l134.144-101.376 310.784 284.672c17.92 16.384 44.032 19.456 65.536 8.192l147.968-79.36c18.432-9.728 30.208-29.184 30.208-50.176V252.928c0-20.992-11.776-40.448-30.208-50.176l-147.968-79.36c-21.504-11.264-47.616-8.192-65.536 8.192z m-185.856 378.88l233.984-177.152v354.816L479.232 510.464z"
              fill="#8a8a8a"
            />
          </svg>
        </Tooltip>
      </div>
      {expandEditor && (
        <MonacoEditor
          tabs={tabs}
          code={innerCode}
          sourceCode={innerSourceCode}
          updateRequire={updateRequire}
          require={require}
          setReload={setReload}
          setReset={setReset}
        />
      )}
    </div>
  );
};
