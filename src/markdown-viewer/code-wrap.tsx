import { useState } from "react";
import SyntaxLighter from "./syntax-lighter";

export default ({ code, children, codeTheme }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="markdown-viewer-code-wrap">
      <div className="markdown-viewer-code-wrap-body">{children}</div>
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
          <SyntaxLighter
            language={"tsx"}
            code={String(code).replace(/\n$/, "")}
            codeTheme={codeTheme}
          />
        </div>
      )}
    </div>
  );
};