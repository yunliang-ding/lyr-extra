import { Button, Tabs } from "@arco-design/web-react";
import { CodeEditor } from "lyr-code-editor";
import { babelParse } from "@/index";

export default ({
  tabs,
  code,
  innerCode,
  source,
  setReload,
  codeTheme,
  require,
  updateRequire,
}) => {
  return (
    <div className="markdown-viewer-code-wrap-footer">
      <Tabs
        size="mini"
        extra={[
          <Button
            size="mini"
            title="点击运行"
            type="text"
            style={{
              marginRight: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
            onClick={() => {
              setReload(Math.random());
            }}
          >
            运行
          </Button>,
        ]}
      >
        {tabs.map((tab, index) => {
          return (
            <Tabs.TabPane key={tab} title={tab} style={{ padding: 0 }}>
              <CodeEditor
                require={require}
                value={String(index === 0 ? code : source[tab]).replace(
                  /\n$/,
                  ""
                )}
                onChange={(value: string) => {
                  if (index === 0) {
                    innerCode.code = value;
                  } else {
                    updateRequire[tab] = babelParse({
                      code: value,
                      require,
                    });
                  }
                }}
                style={{ height: 200 }}
                theme={codeTheme === "dark" ? "vs-dark" : "vs"}
                mode="function"
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
