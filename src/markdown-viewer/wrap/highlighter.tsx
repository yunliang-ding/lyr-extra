import { Tabs } from "@arco-design/web-react";
import SyntaxLighter from "../syntax-lighter";

export default ({ tabs, codeTheme, code, source }) => {
  return (
    <div className="markdown-viewer-code-wrap-footer">
      <Tabs size="mini">
        {tabs.map((tab, index) => {
          return (
            <Tabs.TabPane key={tab} title={tab} style={{ padding: 0 }}>
              <SyntaxLighter
                codeTheme={codeTheme}
                code={String(index === 0 ? code : source[tab]).replace(
                  /\n$/,
                  ""
                )}
                language={"tsx"}
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
