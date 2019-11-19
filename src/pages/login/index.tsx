import React from 'react';
import LoginForm from './components/LoginForm';
import styles from './index.less';
import API from '@/api';
import logo from '@/assets/logo.png';
import onLogin from './onLogin';
import router from '@/components/Router';

const Login = () => {
  const handleLogin = values => {
    const isCell = /^1[0-9]{10}$/.test(values.username);
    const params = {
      [isCell ? 'cell' : 'nickName']: values.username,
      loginPassword: values.password,
    };

    onLogin(API.home.userLogin(params)).then(data => {
      router.replace('/');
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles['logo-img']} />
        <h2 className={styles.title}>工作台</h2>
      </div>
      <div className={styles.content}>
        <LoginForm onSuccess={handleLogin} userName="test" />
      </div>
    </div>
  );
};

export default Login;
