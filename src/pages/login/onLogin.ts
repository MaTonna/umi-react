/*
 * @Description: 通用登录事件
 * @Author: qihao
 * @Date: 2019-10-25 17:40:57
 * @Last Modified by: qihao
 * @Last Modified time: 2019-11-13 12:09:48
 */
import store from 'store';
// import { showErrorMessage } from '@/utils';

const onLogin = (req: any, onError?: (error: any) => void) => {
  // TODO: domi-store/utils
  const setToken = (headers: any) => {
    const sessionName = headers.sessionname;
    const sessionId = headers[sessionName.toLowerCase()];
    store.set('token', { sessionId, sessionName });
  };

  const setUser = (data: any) => {
    if (data.success) {
      delete data.success;
      store.set('user', data);
    }
  };

  return new Promise((resolve, reject) => {
    req
      .then((res: any) => {
        const { data, headers } = res;

        if (data.success) {
          setToken(headers);
          setUser(data);

          resolve(data);
        } else {
          if (onError) {
            reject(data);
          } else {
            // showErrorMessage(data);
          }
        }
      })
      .catch((error: any) => {
        if (onError) {
          reject(error);
        } else {
          // showErrorMessage(error);
        }
      });
  });
};

export default onLogin;
