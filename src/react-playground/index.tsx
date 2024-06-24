import React, { CSSProperties } from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { ResizeBox } from '@arco-design/web-react';
import { babelParse } from 'lyr-extra';
import Editor from './editor';
import './index.less';

const initRequire = (
  dependencies: { [key: string]: string },
  outRequire = {},
) => {
  const require = {};
  Object.keys(dependencies).forEach((key) => {
    require[key] = babelParse({
      code: dependencies[key],
      require: outRequire,
    });
  });
  return require;
};

class RenderComponent extends React.PureComponent {
  props: any;
  state = { hasError: false, error: '' };
  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <pre style={{ color: 'red', margin: 0 }}>
          {String(this.state.error)}
        </pre>
      );
    } else {
      const Component = babelParse({
        code: this.props.code,
        require: this.props.require,
      });
      return <Component />;
    }
  }
}

export interface PlayGroundProps {
  code: string;
  require: any;
  previewOnly?: boolean;
  style?: CSSProperties;
  dependencies: {
    [key: string]: string;
  };
}

export default ({
  style = {},
  code,
  dependencies = {},
  require = {},
  previewOnly = false,
}: PlayGroundProps) => {
  const tabs = ['index.tsx', ...Object.keys(dependencies).map((key) => key)];
  const [spin, setSpin] = useState(true);
  const [reload, setReload] = useState(Math.random());
  const [updateRequire] = useState(initRequire(dependencies, require));
  const [innerCode] = useState({ value: code });
  const [innerSourceCode] = useState({ value: dependencies });
  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    });
  }, []);
  return previewOnly ? (
    <RenderComponent
      code={innerCode.value}
      require={{
        ...require,
        ...updateRequire,
      }}
    />
  ) : (
    <div className="react-playground" style={style}>
      <ResizeBox.Split
        direction={'horizontal'}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid var(--color-border)',
        }}
        size={0.6}
        max={0.6}
        min={0.4}
        panes={[
          !spin && (
            <Editor
              tabs={tabs}
              code={innerCode}
              sourceCode={innerSourceCode}
              updateRequire={updateRequire}
              require={require}
              setReload={setReload}
            />
          ),
          <div
            key={reload}
            style={{ padding: 16, background: '#fff', height: '100%' }}
          >
            <RenderComponent
              code={innerCode.value}
              require={{
                ...require,
                ...updateRequire,
              }}
            />
          </div>,
        ]}
      />
    </div>
  );
};
