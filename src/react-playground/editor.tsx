import { useRef, useState } from 'react';
import { CodeEditor } from 'lyr-code-editor';
import Tabs from './tabs';

export default ({
  tabs,
  code,
  sourceCode,
  setReload,
  require,
  updateRequire,
  showLogo = false,
}) => {
  const refArr = tabs.map(() => useRef({}));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div
      className="monaco-component show-file-icons"
      style={{ width: '100%', height: '100%', background: "#252526" }}
    >
      {showLogo && (
        <span
          style={{
            color: '#fff',
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            height: 35,
            width: 100,
            overflow: 'hidden',
          }}
        >
          <i className="file-icon javascriptreact-lang-file-icon" />
          <i style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 10 }}>
            PLAYGROUND
          </i>
        </span>
      )}
      <Tabs
        tabs={tabs}
        style={{ paddingLeft: showLogo ? 100 : 0 }}
        selectedTab={selectedTab}
        onClick={(tab: string) => {
          setSelectedTab(tab);
        }}
      />
      {tabs.map((tab, index) => {
        return (
          <CodeEditor
            codeRef={refArr[index]}
            require={{
              ...require,
              ...updateRequire,
            }}
            style={{
              display: tab === selectedTab ? 'block' : 'none',
              height: 'calc(100% - 35px)',
            }}
            value={String(
              index === 0 ? code.value : sourceCode.value[tab],
            ).replace(/\n$/, '')}
            debounceTime={500}
            onChange={(value: string, parseResult: any) => {
              if (index === 0) {
                code.value = value;
              } else {
                try {
                  updateRequire[tab] = parseResult;
                } catch (error) {
                  console.log('onChangeError', error);
                }
              }
              setReload(Math.random()); // render
            }}
            mode="function"
          />
        );
      })}
    </div>
  );
};
