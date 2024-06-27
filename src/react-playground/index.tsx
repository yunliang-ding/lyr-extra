import React, { useEffect, useMemo, useRef } from 'react';
import { ReactNode, useState } from 'react';
import { Button, ResizeBox, Tabs } from '@arco-design/web-react';
import { PlayGroundProps } from './type';
import { IconRefresh, IconDelete } from '@arco-design/web-react/icon';
import { babelParse, ConsoleRender } from '..';
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

export default ({
  style = {},
  code,
  dependencies = {},
  require = {},
  previewOnly = false,
  showLogo = false,
  showConsole = false,
}: PlayGroundProps) => {
  const divRef: any = useRef({});
  const [load, setLoad] = useState(false);
  const [reload, setReload] = useState(Math.random());
  const [activeTab, setActiveTab] = useState('0');
  const [updateRequire] = useState(initRequire(dependencies, require));
  const [innerCode] = useState({ value: code });
  const [innerSourceCode] = useState({ value: dependencies });
  const tabs = useMemo(
    () => ['index.tsx', ...Object.keys(dependencies).map((key) => key)],
    [dependencies],
  );
  const { listener, destory, clear } = useMemo(
    () =>
      ConsoleRender.create({
        theme: 'light',
      }),
    [],
  );
  useEffect(() => {
    listener(divRef.current);
    return destory;
  }, []);
  useEffect(() => {
    setLoad(true);
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
        size={0.5}
        max={0.6}
        min={0.4}
        panes={[
          <Editor
            showLogo={showLogo}
            tabs={tabs}
            code={innerCode}
            sourceCode={innerSourceCode}
            updateRequire={updateRequire}
            require={require}
            setReload={setReload}
          />,
          <div style={{ background: '#fff', height: '100%' }}>
            <div
              style={{
                width: '100%',
                height: 40,
              }}
            >
              <Tabs
                onChange={setActiveTab}
                activeTab={activeTab}
                extra={
                  activeTab === '0' ? (
                    <Button
                      style={{ marginRight: 8 }}
                      icon={<IconRefresh />}
                      onClick={() => {
                        setReload(Math.random());
                      }}
                      size="small"
                    />
                  ) : (
                    <Button
                      style={{ marginRight: 8 }}
                      icon={<IconDelete />}
                      onClick={clear}
                      size="small"
                    />
                  )
                }
              >
                <Tabs.TabPane title="预览" key="0" />
                {showConsole && <Tabs.TabPane title="控制台" key="1" />}
              </Tabs>
            </div>
            <div
              style={{
                height: 'calc(100% - 40px)',
                width: '100%',
              }}
            >
              <div
                key={reload}
                style={{
                  padding: 16,
                  height: '100%',
                  overflow: 'auto',
                  display: activeTab === '0' ? 'block' : 'none',
                }}
              >
                {useMemo(() => {
                  return load ? (
                    <RenderComponent
                      code={innerCode.value}
                      require={{
                        ...require,
                        ...updateRequire,
                      }}
                    />
                  ) : null;
                }, [reload, load])}
              </div>
              <div
                ref={divRef}
                style={{
                  height: '100%',
                  overflow: 'auto',
                  display: activeTab === '1' ? 'block' : 'none',
                }}
              />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
