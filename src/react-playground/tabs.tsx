import { Tooltip } from '@arco-design/web-react';

export default ({
  tabs = [],
  selectedTab,
  onClick,
  resetCode,
}) => {
  return (
    <>
      <div className="demos-playground-tabs">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'calc(100% - 40px)',
            overflow: 'auto',
            height: '100%',
          }}
        >
          {tabs.map((tab) => {
            return (
              <div
                key={tab}
                className={
                  tab === selectedTab
                    ? 'demos-playground-tabs-tab demos-playground-tabs-tab-selected'
                    : 'demos-playground-tabs-tab'
                }
                onClick={() => {
                  onClick(tab);
                }}
              >
                <i className="file-icon typescriptreact-lang-file-icon" />
                <span style={{ color: 'var(--vscode-icon-foreground)' }}>
                  {tab}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 40,
            overflow: 'hidden',
            height: '100%',
            justifyContent: 'flex-end',
            padding: '0 12px',
          }}
        >
          <Tooltip content="重置代码片段">
            <svg
              viewBox="0 0 1024 1024"
              onClick={resetCode}
              width="20"
              height="20"
              style={{
                cursor: 'pointer',
              }}
            >
              <path
                d="M512 682.666667c71.296 0 128-56.789333 128-128s-56.704-128-128-128-128 56.789333-128 128 56.704 128 128 128z"
                fill="#ccc"
              ></path>
              <path
                fill="#ccc"
                d="M888.192 477.269333a381.44 381.44 0 0 0-57.813333-137.344 386.261333 386.261333 0 0 0-103.68-103.68 381.866667 381.866667 0 0 0-137.344-57.813333 385.194667 385.194667 0 0 0-78.421334-7.68V85.333333L341.333333 213.333333l169.6 128V256.085333c20.650667-0.085333 41.301333 1.877333 61.226667 5.973334a297.002667 297.002667 0 0 1 106.752 44.928 298.88 298.88 0 0 1 80.725333 80.725333A297.258667 297.258667 0 0 1 810.666667 554.666667a300.032 300.032 0 0 1-23.466667 116.266666 303.36 303.36 0 0 1-27.477333 50.688 307.2 307.2 0 0 1-36.608 44.330667 299.861333 299.861333 0 0 1-150.869334 81.365333 304.213333 304.213333 0 0 1-120.405333 0 297.002667 297.002667 0 0 1-106.794667-44.970666 298.752 298.752 0 0 1-80.64-80.64A298.496 298.496 0 0 1 213.333333 554.666667H128a384.853333 384.853333 0 0 0 65.664 214.784 388.096 388.096 0 0 0 103.594667 103.594666A381.866667 381.866667 0 0 0 512 938.666667a387.84 387.84 0 0 0 77.397333-7.808 384.597333 384.597333 0 0 0 137.301334-57.813334 379.136 379.136 0 0 0 56.789333-46.890666 393.728 393.728 0 0 0 46.933333-56.832A381.952 381.952 0 0 0 896 554.666667a387.84 387.84 0 0 0-7.808-77.397334z"
              ></path>
            </svg>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
