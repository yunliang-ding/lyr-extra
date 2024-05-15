import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { copyToClipBoard } from "..";

export default ({ code, children }) => {
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
          onClick={async () => {
            await copyToClipBoard(code);
          }}
        >
          <path
            d="M419.72 702.54h323.11v68.2H419.72zM419.72 548.23h214.41v68.2H419.72z"
            fill="#8a8a8a"
          ></path>
          <path
            d="M771.35 254.5l-70.11-73.76c-0.72-0.75-1.46-1.44-2.22-2.12l-7.89-8.27h-10.96c-2.41-0.26-4.85-0.26-7.27 0h-69.02l2.08-1.99L506.58 64H165.89c-38.24 0.03-69.23 31.03-69.27 69.27v651.11c0.04 38.24 31.03 69.23 69.27 69.27h115.29v37.08c0.04 38.24 31.03 69.23 69.27 69.27h507.67c38.24-0.04 69.23-31.03 69.27-69.27V418.04L771.35 254.5z m-64.59 31.04l14.52 15.23 88.16 92.67-106.89-5.23a0.976 0.976 0 0 1-0.69-1.07l4.9-101.6z m-425.58-45.92v545.79H165.89c-0.58-0.03-1.03-0.49-1.07-1.07V133.27c0.04-0.57 0.5-1.03 1.07-1.07h311.46l36.34 38.15H350.45c-38.24 0.04-69.24 31.03-69.27 69.27z m578.01 651.11c-0.04 0.57-0.5 1.03-1.07 1.07l0.01-0.03H350.45c-0.57-0.04-1.03-0.5-1.07-1.07V239.62c0.04-0.57 0.5-1.03 1.07-1.07h290.29l-7 145.42v0.14c-1.68 38.14 27.83 70.54 65.64 72.22l159.8 7.77v426.63z"
            fill="#8a8a8a"
          ></path>
        </svg>
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
          <SyntaxHighlighter
            className="markdown-viewer-code"
            PreTag="div"
            style={oneLight}
            language={"tsx"}
          >
            {String(code).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};
