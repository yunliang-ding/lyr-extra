import useSyncExternalStoreExports from 'use-sync-external-store/shim';

interface InitProps {
  state?: any,
  subscribe?: any,
  getSnapshot?: any,
  dispatch?: any
  listeners?: any;
}

const { useSyncExternalStore } = useSyncExternalStoreExports;

class InitStore {
  public state = {};
  public listeners = new Set();
  constructor(initialStore: any) {
    this.state = initialStore;
  }
  dispatch = (payload: any) => {
    this.state = { ...this.state, ...payload };
    this.listeners.forEach((fn: any) => fn()); // 更新试图
  }
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    }
  }
  getSnapshot = () => {
    return this.state;
  };
}

export const CreateStore = <T>(initialStore: T & ThisType<T>) => {
  const initStore = new InitStore(initialStore);
  /** 对 initStore 取值进行监听 */
  const store: InitProps = new Proxy(initStore, {
    get: (target, propKey, receiver) => {
      if (!['subscribe', 'getSnapshot'].includes(propKey as string)) {
        return initStore.state[propKey];
      }
      return Reflect.get(target, propKey, receiver);
    },
    set: (target, propKey, value, receiver) => {
      // 数据发生更新
      if (target.state[propKey] !== value) {
        initStore.dispatch({ [propKey]: value })
      }
      return Reflect.set(target, propKey, value, receiver);
    },
  });
  return store as T;
};

export const useStore = <T>(store: T & InitProps): T => {
  const initStore = useSyncExternalStore(store.subscribe, store.getSnapshot);
  Object.keys(initStore).forEach(key => {
    if (typeof initStore[key] === 'function') {
      initStore[key] = initStore[key].bind(store); // bind this
    }
  })
  return initStore as T
}
