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
      <Button
        title="点击运行"
        type="primary"
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          zIndex: 9,
        }}
        onClick={() => {
          setReload(Math.random());
        }}
      >
        点击运行
      </Button>
      {tabs.length > 1 ? (
        <Tabs size="mini">
          {tabs.map((tab: any, index: number) => {
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
                  style={{ height: 260 }}
                  theme={codeTheme === "dark" ? "vs-dark" : "vs"}
                  mode="function"
                />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <CodeEditor
          require={require}
          value={String(code).replace(/\n$/, "")}
          onChange={(value: string) => {
            innerCode.code = value;
          }}
          style={{ height: 260 }}
          theme={codeTheme === "dark" ? "vs-dark" : "vs"}
          mode="function"
        />
      )}
    </div>
  );
};
