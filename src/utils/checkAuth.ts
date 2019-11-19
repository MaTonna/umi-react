import store from 'store';
const checkAuth = (option: string[] | string | undefined): boolean => {
  let auths: string[] = [];

  if (typeof option === 'undefined') {
    // 如果没有配置权限，默认所有用户都可以访问
    return true;
  }

  if (typeof option === 'string') {
    auths.push(option);
  } else if (option instanceof Array) {
    auths = option;
  }

  const authorities = store.get('authorities');

  let result = false;

  for (const auth of auths) {
    const reg = new RegExp(auth + '(]|,)');
    if (auth === 'ALL') {
      result = true;
      break;
    }
    if (reg.test(authorities)) {
      result = true;
      break;
    }
  }

  return result;
};

export default checkAuth;
