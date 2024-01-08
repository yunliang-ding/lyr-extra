import React from 'react';
import { babelParse } from 'lyr-extra';

export default () => {
  const Vdom = babelParse({
    require: {
      axios: {
        get: () => 'is get',
      },
    },
    code: `
import axios from 'axios';

export default (props) => {
  React.useEffect(() => {
    console.log(axios)
  }, [])
  return <div>{props.name}-{axios.get()}</div>
}
`})
  return <div><Vdom name='我是转义节点'/></div>;
}
