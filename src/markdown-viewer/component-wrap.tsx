import { useState } from "react";
import { Message, Tabs } from "@arco-design/web-react";
import { CodeEditor } from "lyr-code-editor";

export default ({
  style = {},
  code,
  children,
  codeTheme,
  tabs = [],
  source = {},
  expand = false,
  require,
}) => {
  const [open, setOpen] = useState(expand);
  return (
    <div className="markdown-viewer-code-wrap">
      <div className="markdown-viewer-code-wrap-body" style={style}>
        {children}
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
              <svg
                viewBox="0 0 1024 1024"
                width="12"
                height="12"
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                onClick={() => {
                  Message.info("开发中!");
                }}
              >
                <path
                  d="M886.784 512a25.6 25.6 0 0 1-11.4944 21.3504l-698.368 460.8a25.6512 25.6512 0 0 1-26.24 1.2032A25.6256 25.6256 0 0 1 137.216 972.8V51.2a25.5744 25.5744 0 0 1 39.7056-21.3504l698.368 460.8a25.6 25.6 0 0 1 11.4944 21.3504z"
                  fill="#8a8a8a"
                ></path>
              </svg>,
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
