import { useRef, useState } from 'react';
import { CodeEditor } from 'lyr-code-editor';
import Tabs from './tabs';

export default ({
  tabs,
  code,
  sourceCode,
  setReset,
  setReload,
  require,
  updateRequire,
}) => {
  const refArr = tabs.map(() => useRef({}));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div
      className="monaco-component show-file-icons"
      style={{ width: '100%', height: '100%' }}
    >
      <Tabs
        tabs={tabs}
        resetCode={() => {
          setReset(Math.random());
          tabs.forEach((tab: string, index: number) => {
            refArr[index].current.getMonacoInstance().then((res) => {
              res.setValue(index === 0 ? code.value : sourceCode.value[tab]);
            });
          });
        }}
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
