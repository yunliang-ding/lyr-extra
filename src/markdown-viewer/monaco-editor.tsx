import { Tabs } from '@arco-design/web-react';
import { CodeEditor } from 'lyr-code-editor';

export default ({
  tabs,
  innerCode,
  source,
  setReload,
  require,
  updateRequire,
}) => {
  return (
    <div className="markdown-viewer-code-wrap-footer">
      {tabs.length > 1 ? (
        <Tabs size="mini">
          {tabs.map((tab: any, index: number) => {
            return (
              <Tabs.TabPane key={tab} title={tab} style={{ padding: 0 }}>
                <CodeEditor
                  require={require}
                  value={String(
                    index === 0 ? innerCode.code : source[tab],
                  ).replace(/\n$/, '')}
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
                  style={{ height: 260 }}
                  mode="function"
                />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <CodeEditor
          require={require}
          value={String(innerCode.code).replace(/\n$/, '')}
          onChange={(value: string) => {
            innerCode.code = value;
            // render 一次
            setTimeout(() => {
              setReload(Math.random());
            }, 500);
          }}
          style={{ height: 260 }}
          mode="function"
        />
      )}
    </div>
  );
};
