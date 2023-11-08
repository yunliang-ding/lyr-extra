import useSyncExternalStoreExports from 'use-sync-external-store/shim';

const { useSyncExternalStore } = useSyncExternalStoreExports;

class InitStore {
  public state = {};
  public listeners = new Set();
  constructor(initialStore: any) {
    this.state = initialStore;
  }
  dispatch = (payload: any) => {
    const newState = new Proxy({ ...this.state, ...payload }, {
      set: (target, propKey, value, receiver) => {
        if (target[propKey] !== value) {
          this.dispatch({ [propKey]: value })
        }
        return Reflect.set(target, propKey, value, receiver);
      },
    });
    this.state = newState;
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

export const CreateStore = <T>(initialStore: T) => {
  const store = new InitStore(initialStore)
  return new Proxy(store, {
    get: (target, propKey, receiver) => {
      if(!['subscribe', 'getSnapshot'].includes(propKey as string)){
        return store.state[propKey];
      }
      return Reflect.get(target, propKey, receiver);
    },
    set: (target, propKey, value, receiver) => {
      // 数据发生更新
      if (target[propKey] !== value) {
        store.dispatch({ [propKey]: value })
      }
      return Reflect.set(target, propKey, value, receiver);
    },
  }) as T;
};

export const useStore = function (store) {
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}
