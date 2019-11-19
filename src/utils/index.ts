import { message, Modal } from 'antd';
import router from '@/components/Router';

interface Data {
  [key: string]: any;
}

let _loginPrompt: any = null;
export const showLoginPrompt = () => {
  if (_loginPrompt) return;
  _loginPrompt = Modal.error({
    title: '提示',
    content: '未登录，请先登录！',
    okText: '去登录',
    onOk() {
      _loginPrompt = null;
      router.replace(`/login?goto=`);
    },
  });
};

// 错误提示统一在这里处理
export const showError = (data: Data) => {
  if (!data['error']) {
    return;
  }
  const error = data.error;
  const excludeCode = ['']; // 在数组里的错误不做处理

  switch (error.code) {
    case 'USER_NOT_LOGIN':
      showLoginPrompt();
      break;
    case excludeCode.join('|'):
      console.error(error.message);
      break;
    default:
      message.error(error.message);
      break;
  }
};
