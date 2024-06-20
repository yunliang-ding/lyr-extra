export default ({ tabs = [], selectedTab, onClick }) => {
  return (
    <>
      <div className="markdown-viewer-code-wrap-footer-tabs">
        {tabs.map((tab) => {
          return (
            <div
              key={tab}
              className={
                tab === selectedTab
                  ? 'markdown-viewer-code-wrap-footer-tabs-tab markdown-viewer-code-wrap-footer-tabs-tab-selected'
                  : 'markdown-viewer-code-wrap-footer-tabs-tab'
              }
              onClick={() => {
                onClick(tab);
              }}
            >
              <i className="file-icon typescriptreact-lang-file-icon" />
              <span style={{ color: '#fff' }}>{tab}</span>
            </div>
          );
        })}
      </div>
      <div className="markdown-viewer-code-wrap-footer-breadcrumbs">
        {location.hash.split("/").map((i) => {
          return (
            <div
              className="markdown-viewer-code-wrap-footer-breadcrumbs-dir"
              key={i}
            >
              {i}
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6066"
                width="16"
                height="16"
              >
                <path
                  d="M648.533333 486.4L426.666667 264.533333c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l196.266666 192-196.266666 192c-12.8 12.8-12.8 38.4 0 51.2 12.8 12.8 38.4 12.8 51.2 0l226.133333-217.6c12.8-8.533333 12.8-29.866667-4.266667-46.933333z"
                  p-id="6067"
                  fill="#aaa"
                ></path>
              </svg>
            </div>
          );
        })}
        <div className="markdown-viewer-code-wrap-footer-breadcrumbs-dir">
          <i className="file-icon typescriptreact-lang-file-icon" />
          <span style={{ color: '#fff' }}>{selectedTab}</span>
        </div>
      </div>
    </>
  );
};
