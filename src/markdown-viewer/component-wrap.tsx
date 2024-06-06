import { useMemo, useState } from "react";
import { Button, Tabs } from "@arco-design/web-react";
import { CodeEditor } from "lyr-code-editor";
import { babelParse } from "..";

export default ({
  style = {},
  code,
  codeTheme,
  source = {},
  expand = false,
  require,
}) => {
  const [open, setOpen] = useState(expand);
  const [reload, setReload] = useState(Math.random());
  const [innerCode] = useState({ code });
  const [updateRequire] = useState({});
  const tabs = useMemo(() => ["index.tsx"], [reload]);
  const Comp = useMemo(
    () =>
      babelParse({
        code: innerCode.code,
        require: {
          ...require,
          ...updateRequire,
        },
        onRequire: (requireName: string) => {
          if (requireName.endsWith(".ts") || requireName.endsWith(".tsx")) {
            tabs.push(requireName);
          }
        },
      }),
    [reload]
  );
  return (
    <div className="markdown-viewer-code-wrap">
      <div className="markdown-viewer-code-wrap-body" style={style}>
        <Comp />
      </div>
      <div className="markdown-viewer-code-wrap-extra">
        <svg
          viewBox="0 0 1024 1024"
          width="18"
          height="18"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <path
            fill="#8a8a8a"
            d="M153.770667 517.558857l200.387047-197.241905L302.86019 268.190476 48.761905 518.290286l254.439619 243.614476 50.590476-52.833524-200.021333-191.512381zM658.285714 320.316952L709.583238 268.190476l254.098286 250.09981L709.241905 761.904762l-50.590476-52.833524 200.021333-191.512381L658.285714 320.316952z m-112.981333-86.186666L393.99619 785.554286l70.534096 19.358476 151.30819-551.399619-70.534095-19.358476z"
          ></path>
        </svg>
      </div>
      {open && (
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
                <svg viewBox="0 0 1024 1024" width="18" height="18">
                  <path
                    d="M510.976 64.64a446.72 446.72 0 1 1 0 893.504 446.72 446.72 0 0 1 0-893.44z m0 69.568a375.296 375.296 0 0 0-266.688 110.464A376.96 376.96 0 0 0 364.16 858.88a374.016 374.016 0 0 0 146.816 29.632 375.296 375.296 0 0 0 266.688-110.464 375.808 375.808 0 0 0 110.4-266.688 375.296 375.296 0 0 0-110.464-266.688 376.96 376.96 0 0 0-266.624-110.464zM435.584 300.736a34.816 34.816 0 0 1 36.864 4.48l215.04 175.232a34.56 34.56 0 0 1 0 53.888l-215.04 175.168a34.816 34.816 0 0 1-56.768-26.88V332.16c0-13.44 7.744-25.6 19.84-31.36z m49.728 104.704V609.28l125.056-101.888-125.056-101.952z"
                    fill="#8a8a8a"
                  />
                </svg>
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
      )}
    </div>
  );
};
