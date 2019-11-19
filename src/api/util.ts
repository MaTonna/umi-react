import axios from 'axios';
import qs from 'qs';
import { showError } from '@/utils';

// const DEV = process.env.NODE_ENV === 'development';
/**
 * @example <caption>get请求数据方法</caption>
 * T.get(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} params - 参数
 * @param {object} withCredentials - 支持跨域
 * @param {function} callback - 取消请求回调
 * @returns
 */
const get = (url: string, params = {}, withCredentials = false, callback?: (c: any) => void) => {
  const CancelToken = axios.CancelToken;
  return new Promise((resolve, reject) => {
    Object.assign(params, { _: Date.now() });
    axios({
      method: 'GET',
      url,
      params: params,
      withCredentials: withCredentials,
      cancelToken: new CancelToken(function executor(c) {
        if (callback) {
          callback(c);
        }
      }),
    })
      .then(res => {
        const { data = {} } = res;
        if (data.success) {
          resolve(data);
        } else {
          // 错误提示统一处理
          showError(data);
          reject(data);
        }
      })
      .catch(error => {
        // 错误提示统一处理
        showError(error);
        reject(error);
      });
  });
};

/**
 * @example <caption>post请求数据方法</caption>
 * T.post(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */

const post = (url: string, data = {}, withCredentials = false) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      withCredentials,
      data: qs.stringify(data),
      url,
    })
      .then(res => {
        const { data = {} } = res;
        if (data.success) {
          resolve(data);
        } else {
          // 错误提示统一处理
          showError(data);
          reject(data);
        }
      })
      .catch(error => {
        // 错误提示统一处理
        showError(error);
        reject(error);
      });
  });
};

/**
 * @example <caption>上传数据方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const upload = (url: string, form: any, withCredentials = false) => {
  let _formData = new FormData(form);
  return new Promise((resolve, reject) => {
    axios
      .post(url, _formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
      })
      .then(res => {
        const { data = {} } = res;
        if (data.success) {
          resolve(data);
        } else {
          // 错误提示统一处理
          showError(data);
          reject(data);
        }
      })
      .catch(error => {
        // 错误提示统一处理
        showError(error);
        reject(error);
      });
  });
};

/**
 * @example <caption>上传文件方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const uploadFile = (url: string, option: any = {}, withCredentials = false) => {
  const formData = new FormData();
  const file = option.file;
  formData.append('fileItem', file, file.name);
  formData.append('name', file.name);
  formData.append('type', file.type);
  formData.append('lastModifiedDate', file.name);
  formData.append('size', file.size);
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
      })
      .then(res => {
        const { data = {} } = res;
        if (data.success) {
          resolve(data);
        } else {
          // 错误提示统一处理
          showError(data);
          reject(data);
        }
      })
      .catch(error => {
        // 错误提示统一处理
        showError(error);
        reject(error);
      });
  });
};

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api';

export { get, post, upload, uploadFile };
