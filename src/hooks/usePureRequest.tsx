import { useState, useRef } from 'react';

/**
 * 提供 loading标识 + 时间戳校验
 */

interface RequestData {
  url: string;
  data?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  cancelToken?: any;
}

interface ResponseData {
  code: number;
  data: any;
  flag: boolean;
  success: boolean;
  msg: string;
}

export default (request) => {
  const [loading, setLoading] = useState(false); // loading
  const timeStampRef = useRef(0);
  const cancel = useRef(() => {});
  const CancelToken = request?.CancelToken;
  function fetchData({ url = '', data = {}, method = 'POST' }: RequestData) {
    setLoading(true);
    cancel.current?.();
    timeStampRef.current = new Date().getTime();
    const formData: any = {};
    formData.timeStamp = timeStampRef.current;
    if (method.toUpperCase() === 'GET') {
      formData.params = data;
    } else {
      formData.data = data;
    }
    return new Promise((resolve, reject) => {
      request({
        url,
        ...formData,
        method,
        cancelToken: new CancelToken((c) => {
          cancel.current = c;
        }),
      })
        .then((res: ResponseData) => {
          if (formData.timeStamp === timeStampRef.current) {
            resolve(res);
          } else {
            reject(new Error('时间戳不一致，无效的fetch'));
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          if (formData.timeStamp === timeStampRef.current) {
            setLoading(false);
          }
        });
    });
  }
  return [loading, fetchData] as [
    boolean,
    ({ url, data, method }: RequestData) => Promise<ResponseData>,
  ];
};
