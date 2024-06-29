import { useEffect, useState } from 'react';
import { copyToClipBoard } from '..';

const RenderCode = (props) => {
  const [code, setCode] = useState('');
  useEffect(() => {
    (async () => {
      setCode(
        await (window as any).shiki?.codeToHtml(props.code, {
          theme: 'one-dark-pro',
          lang: props.language,
        }),
      );
    })();
  }, [props.theme]);
  return (
    <div
      className="markdown-viewer-code"
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  );
};

export default ({ code, language }) => {
  return (
    <div style={{ position: 'relative' }}>
      <RenderCode code={code} language={language} />
      <svg
        viewBox="0 0 1024 1024"
        width="16"
        height="16"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: 6,
          right: 6,
        }}
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
    </div>
  );
};
