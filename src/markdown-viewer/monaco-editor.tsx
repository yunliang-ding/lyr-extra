import { CodeEditor } from 'lyr-code-editor';
import { useState } from 'react';
import Tabs from './tabs';

export default ({
  tabs,
  innerCode,
  source,
  setReload,
  require,
  updateRequire,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className="markdown-viewer-code-wrap-footer monaco-component show-file-icons">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onClick={(tab) => {
          setSelectedTab(tab);
        }}
      />
      {tabs.map((tab, index) => {
        return (
          <CodeEditor
            require={require}
            style={{
              display: tab === selectedTab ? 'block' : 'none',
              height: 300,
            }}
            value={String(index === 0 ? innerCode.code : source[tab]).replace(
              /\n$/,
              '',
            )}
            onChange={(value: string, parseResult: any) => {
              if (index === 0) {
                innerCode.code = value;
              } else {
                try {
                  updateRequire[tab] = parseResult;
                } catch (error) {
                  console.log(error);
                }
              }
              // render 一次
              setTimeout(() => {
                setReload(Math.random());
              }, 500);
            }}
            mode="function"
          />
        );
      })}
    </div>
  );
};
