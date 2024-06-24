export default ({
  tabs = [],
  selectedTab,
  onClick,
}) => {
  return (
    <>
      <div className="react-playground-tabs">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          {tabs.map((tab) => {
            return (
              <div
                key={tab}
                className={
                  tab === selectedTab
                    ? 'react-playground-tabs-tab react-playground-tabs-tab-selected'
                    : 'react-playground-tabs-tab'
                }
                onClick={() => {
                  onClick(tab);
                }}
              >
                <i className="file-icon javascriptreact-lang-file-icon" />
                <span style={{ color: 'var(--vscode-icon-foreground)' }}>
                  {tab}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
