import { Tabs } from '@arco-design/web-react';
import SyntaxLighter from '../syntax-lighter';

export default ({ tabs, codeTheme, code, source }) => {
  return (
    <div className="markdown-viewer-code-wrap-footer">
      {tabs.length > 1 ? (
        <Tabs size="mini">
          {tabs.map((tab: any, index: number) => {
            return (
              <Tabs.TabPane key={tab} title={tab} style={{ padding: 0 }}>
                <SyntaxLighter
                  codeTheme={codeTheme}
                  code={String(index === 0 ? code : source[tab]).replace(
                    /\n$/,
                    '',
                  )}
                  language={'tsx'}
                />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <SyntaxLighter
          codeTheme={codeTheme}
          code={String(code).replace(/\n$/, '')}
          language={'tsx'}
        />
      )}
    </div>
  );
};
