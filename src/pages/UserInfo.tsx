import React, { useState, useEffect } from 'react';
import store from 'store';
import API from '@/api';
import * as H from 'history';
import { getSideMenuByUrl, getTopMenu } from '@/utils/menu';

interface Props {
  location: H.Location;
}

const UserInfo: React.FC<Props> = props => {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  useEffect(() => {
    // 获取用户信息
    // API.home
    //   .userInfo()
    //   .then((userInfo: any = {}) => {
    //     const { authorities = [], userId = '', userName = '' } = userInfo;
    //     store.set('userInfo', {
    //       authorities,
    //       userId,
    //       userName,
    //     });

    //     const isIndexRoute = props.location.pathname === '/';
    //     const isErrorRoute = props.location.pathname.indexOf('/exception') > -1;
    //     const requestArr: Promise<any>[] = [];
    //     requestArr.push(getTopMenu());
    //     if (!isIndexRoute && !isErrorRoute) {
    //       // 如果不为首页，那么获取当前菜单信息
    //       requestArr.push(getSideMenuByUrl(props.location.pathname));
    //     }
    //     Promise.all(requestArr).then(() => {
    //       setUserInfoLoaded(true);
    //     });
    //   })
    //   .catch((err: any) => {
    //     // console.log(err);
    //   });
  }, []);
  const { children } = props;
  return <>{userInfoLoaded ? children : 'loading userInfo'}</>;
};

export default UserInfo;
