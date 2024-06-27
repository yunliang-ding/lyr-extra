interface ConsoleRenderProps {
  theme?: 'dark' | 'light';
}

export default {
  create: ({ theme, ...reset }: ConsoleRenderProps) => {
    let instance: any = {};
    const { LunaConsole } = window as any;
    const originConsoleLog = console.log.bind(console);
    if (!LunaConsole) {
      console.error('没有LunaConsole对象!');
      return {
        listener: () => {},
        clear: () => {},
        destory: () => {},
      };
    }
    return {
      listener: (el: HTMLElement) => {
        if (el) {
          instance = new LunaConsole(el, {
            theme,
            ...reset,
          });
          /** 修饰打印 */
          console.log = function (...p) {
            originConsoleLog(...p);
            try {
              instance.log(...p);
            } catch (e) {
              originConsoleLog('err', e);
            }
          };
        }
      },
      clear: () => {
        instance.clear();
      },
      destory: () => {
        instance.destory();
      },
    };
  },
};
