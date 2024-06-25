export default ({ tabs = [], selectedTab, onClick, style = {} }) => {
  return (
    <>
      <div className="react-playground-tabs" style={style}>
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
                <i className="file-icon typescriptreact-lang-file-icon" />
                <span>
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
