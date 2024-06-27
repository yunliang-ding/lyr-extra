import React, { useEffect, useMemo, useRef } from 'react';
import { ReactNode, useState } from 'react';
import { Button, ResizeBox, Tabs } from '@arco-design/web-react';
import { PlayGroundProps } from './type';
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
                      icon={
                        <svg viewBox="0 0 1024 1024" width="16" height="16">
                          <path
                            d="M750.933333 273.066667C691.2 209.066667 605.866667 170.666667 512 170.666667c-187.733333 0-341.333333 153.6-341.333333 341.333333s153.6 341.333333 341.333333 341.333333c157.866667 0 290.133333-110.933333 328.533333-256l-89.6 0c-34.133333 98.133333-128 170.666667-238.933333 170.666667-140.8 0-256-115.2-256-256s115.2-256 256-256c72.533333 0 132.266667 29.866667 179.2 76.8L554.666667 469.333333l298.666667 0L853.333333 170.666667 750.933333 273.066667z"
                            fill="#8a8a8a"
                          ></path>
                        </svg>
                      }
                      onClick={() => {
                        setReload(Math.random());
                      }}
                      size="small"
                    />
                  ) : (
                    <Button
                      style={{ marginRight: 8 }}
                      icon={
                        <svg
                          viewBox="0 0 1024 1024"
                          width="16"
                          height="16"
                        >
                          <path
                            d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"
                            fill="#8a8a8a"
                          ></path>
                        </svg>
                      }
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
