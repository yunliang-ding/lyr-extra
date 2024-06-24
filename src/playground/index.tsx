import React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { ResizeBox } from '@arco-design/web-react';
import { babelParse } from 'lyr-extra';
import Editor from './editor';
import './index.less';

interface PlayGroundProps {
  code: string;
  require: any;
  dependencies: {
    [key: string]: string;
  };
}

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
  static getDerivedStateFromError(error) {
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

export default ({ code, dependencies = {}, require = {} }: PlayGroundProps) => {
  const tabs = ['index.tsx', ...Object.keys(dependencies).map((key) => key)];
  const [spin, setSpin] = useState(true);
  const [reload, setReload] = useState(Math.random());
  const [updateRequire] = useState(initRequire(dependencies, require));
  const [innerCode] = useState({ value: code });
  const [innerSourceCode] = useState({ value: dependencies });
  const [reset, setReset] = useState(Math.random());
  useEffect(() => {
    innerCode.value = code;
    innerSourceCode.value = dependencies;
    Object.assign(updateRequire, initRequire(dependencies, require));
    setReload(Math.random());
  }, [reset]);
  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    });
  }, []);
  return (
    <div className="react-playground">
      <ResizeBox.Split
        direction={'horizontal'}
        style={{
          width: '100vw',
          height: '100vh',
          border: '1px solid var(--color-border)',
        }}
        max={0.7}
        min={0.3}
        panes={[
          !spin && (
            <Editor
              tabs={tabs}
              code={innerCode}
              sourceCode={innerSourceCode}
              updateRequire={updateRequire}
              require={require}
              setReload={setReload}
              setReset={setReset}
            />
          ),
          <div
            key={reload}
            style={{ padding: 16, background: '#fff', height: '100vh' }}
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
