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
}) => {
  const refArr = tabs.map(() => useRef({}));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div
      className="monaco-component show-file-icons"
      style={{ width: '100%', height: '100%' }}
    >
      <span
        style={{
          color: '#fff',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          height: 35,
          width: 128,
        }}
      >
        <svg viewBox="0 0 1024 1024" width="14" height="14">
          <path
            d="M665.088 131.584L354.304 415.744 220.16 314.368c-11.264-8.704-27.136-8.192-38.4 0.512L133.12 354.304c-14.848 11.776-15.36 34.304-1.536 47.104L250.88 510.464 131.584 619.52c-14.336 12.8-13.312 35.328 1.536 47.104l48.64 39.424c11.264 9.216 27.136 9.216 38.4 0.512l134.144-101.376 310.784 284.672c17.92 16.384 44.032 19.456 65.536 8.192l147.968-79.36c18.432-9.728 30.208-29.184 30.208-50.176V252.928c0-20.992-11.776-40.448-30.208-50.176l-147.968-79.36c-21.504-11.264-47.616-8.192-65.536 8.192z m-185.856 378.88l233.984-177.152v354.816L479.232 510.464z"
            fill="#1296db"
          />
        </svg>
        <strong
          style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 10 }}
        >
          react-playground
        </strong>
      </span>
      <Tabs
        tabs={tabs}
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
