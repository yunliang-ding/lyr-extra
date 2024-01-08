import React, { useEffect } from 'react';
import { ConsoleRender } from 'lyr-extra';
import { Button } from '@arco-design/web-react';


export default () => {
  const consoleInstance = ConsoleRender.create({
    target: '#console-container',
  });
  useEffect(() => {
    // 监听日志打印
    consoleInstance.listener();
    console.log(100, 'test', new Date(), Object, () => {}, null, undefined);
    console.log(
      [1, 2, 3, 4],
      { name: 'test', age: 10 },
      { address: 'test', liked: [1, 2, 3] },
      [100, 200],
    );
    return consoleInstance.destory;
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          consoleInstance.clear();
        }}
      >
        清空日志
      </Button>
      <br />
      <br />
      <div id="console-container" />
    </>
  );
};