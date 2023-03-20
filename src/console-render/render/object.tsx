import { useState } from 'react';
import { getJSType, RenderChildren } from '../';

export const Svg = ({
  onClick = () => { },
  rotate = 0
}) => {
  return <span onClick={onClick} style={{
    cursor: 'pointer',
    transform: `rotate(${rotate}deg)`,
    marginRight: 6,
  }}>
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8717"
      width="10"
      height="10"
    >
      <path d="M245.034251 895.239428l383.063419-383.063419L240.001631 124.07997l0.070608-0.033769c-12.709463-13.137205-20.530592-31.024597-20.530592-50.731428 0-40.376593 32.736589-73.111135 73.115228-73.111135 19.705807 0 37.591153 7.819083 50.730405 20.528546l0.034792-0.035816 438.686251 438.681134-0.035816 0.034792c13.779841 13.281491 22.3838 31.915897 22.3838 52.586682 0 0.071631 0 0.106424 0 0.178055 0 0.072655 0 0.10847 0 0.144286 0 20.669762-8.603959 39.341007-22.3838 52.623521l0.035816 0.033769L343.426165 1003.661789l-0.180102-0.179079c-13.140275 12.565177-30.950919 20.313651-50.588165 20.313651-40.378639 0-73.115228-32.736589-73.115228-73.114205C219.544717 928.512229 229.432924 908.664182 245.034251 895.239428z" p-id="8718" fill="#333"></path>
    </svg>
  </span>
}

export default ({ value, log }) => {
  const { length } = Object.keys(value);
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="self-node">
        <Svg rotate={expand ? 90 : 0} onClick={() => {
          setExpand(!expand)
        }} />
        <span className="value object">
          ({length}) {'{...}'}
        </span>
      </div>
      {expand && (
        <div className="children-node">
          {Object.keys(value).map((key) => {
            const type = getJSType(value[key]);
            return (
              <div className={`children-node-item children-node-item-${type}`}>
                <div>
                  <span className="key">{key}</span>
                  <span className="colon">:</span>
                </div>
                <RenderChildren value={value[key]} log={log} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
