/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react';
import { getJSType, RenderChildren } from '../';
import { Svg } from './object';

export default ({ value, log }) => {
  const { length } = Object.keys(value);
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="self-node">
        <Svg rotate={expand ? 90 : 0} onClick={() => {
          setExpand(!expand)
        }} />
        <span className="value array">Array({length})</span>
      </div>
      {expand && (
        <div className="children-node">
          {value.map((item, index) => {
            const type = getJSType(item);
            return (
              <div className={`children-node-item children-node-item-${type}`}>
                <div>
                  <span className="key">{index}</span>
                  <span className="colon">:</span>
                </div>
                <RenderChildren value={item} log={log} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
