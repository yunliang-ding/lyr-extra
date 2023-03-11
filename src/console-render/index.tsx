import ObjectRender from './render/object';
import ArrayRender from './render/array';
import BasicRender from './render/basic';
import * as ReactDom from 'react-dom';
import './index.less';

interface ConsoleRenderProps {
  target: string;
}

export const getJSType = (obj: unknown): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};

export const typeMapping = {
  object: ObjectRender,
  array: ArrayRender,
  number: BasicRender,
  string: BasicRender,
  boolean: BasicRender,
  undefined: BasicRender,
  null: BasicRender,
};

export const RenderChildren = ({ value, log }) => {
  const VNode = typeMapping[getJSType(value)] || BasicRender;
  return <VNode value={value} log={log} />;
};

const DomRender = ({ values, log = console.log.bind(console) }) => {
  return (
    <div className="console-wrap">
      {values.map((value, index) => {
        return (
          <div className="console-wrap-row" key={`row-${index}`}>
            {value.map((v, index) => {
              return (
                <div className="console-wrap-row-col" key={`col-${index}`}>
                  <RenderChildren value={v} log={log} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface ResProps {
  listener: Function;
  clear: Function;
  destory: any;
}

export default {
  create: ({ target }: ConsoleRenderProps): ResProps => {
    const HistoryLog = [];
    const console_log_bind_001 = console.log.bind(console);
    const print = (value) => {
      HistoryLog.push(value); // 添加到队列
      if (target) {
        ReactDom.render(
          <DomRender values={HistoryLog} log={console_log_bind_001} />,
          document.querySelector(target),
        );
      }
    };
    return {
      destory: () => {
        /** 还原 */
        console.log = console_log_bind_001;
      },
      listener: () => {
        /** 修饰打印 */
        console.log = function (...p) {
          console_log_bind_001(...p);
          try {
            print(p);
          } catch (e) {
            console_log_bind_001('err', e);
          }
        };
      },
      clear: () => {
        HistoryLog.length = 0;
        ReactDom.render(null, document.querySelector(target));
      },
    };
  },
};
