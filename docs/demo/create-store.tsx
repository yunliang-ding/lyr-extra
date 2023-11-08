import React from 'react';
import { CreateStore, useStore } from 'react-core-form-tools';

const store = CreateStore<{
  count: number;
  addCount(): void;
}>({
  count: 1,
  addCount(){
    this.count += 1;
  }
});

export default () => {
  const { count, addCount } = useStore(store);
  return (
    <div>
      {count}
      <button onClick={() => {
        // store.count += 1;
        addCount()
      }}>
        添加
      </button>
    </div>
  );
};