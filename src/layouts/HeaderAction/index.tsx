import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import styles from './index.less';
// import { getUser, removeToken } from '@/utils/localStorage';
// import { req_logout } from '@/services/home';
// import { showErrorMessage } from '@/utils/util';
// import router from 'umi/router';
// import Redirect from 'umi/redirect';
const HeaderAction = () => {
  // const userinfo = getUser();

  // if (!userinfo) {
  //   return <Redirect to="/login" />;
  // }

  const logout = () => {
    // req_logout()
    //   .then(() => {
    //     //清空token并且记住路径跳转到登录页面
    //     removeToken();
    //     const { search = '', pathname = '' } = window.location;
    //     router.replace(`/login?goto=${pathname}${search}`);
    //   })
    //   .catch(err => {
    //     showErrorMessage(err);
    //   });
  };
  const menu = (
    <Menu
      style={{
        marginTop: -10,
      }}
    >
      <Menu.Item>
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            logout();
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div className={styles.container}>
        <span className={styles.action}>
          <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
          <span style={{ marginLeft: 8 }}>admin</span>
        </span>
      </div>
    </Dropdown>
  );
};

export default HeaderAction;
