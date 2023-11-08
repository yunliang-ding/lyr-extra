import React from 'react';
import { CreateStore, useStore } from 'react-core-form-tools';

const store = CreateStore<{
  count: number;
}>({
  count: 1,
});

export default () => {
  const { count } = useStore(store);
  return (
    <div>
      {count}
      <button
        onClick={() => {
          store.count += 1
        }}
      >
        添加
      </button>
    </div>
  );
};