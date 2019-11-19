/*
 * @Description: 面包屑包装
 * @Author: qihao
 * @Date: 2019-10-24 15:32:44
 * @Last Modified by: xiaojian
 * @Last Modified time: 2019-11-14 11:05:18
 */
import React from 'react';
import { PageHeader } from 'antd';
import Link from '@/components/Link';
interface PageHeaderWrapperProps {
  children?: React.ReactNode;
  breadcrumb?: {};
  route?: {
    path: string;
    name: string;
    [key: string]: any;
  };
}

const PageHeaderWrapper: React.FC<PageHeaderWrapperProps> = props => {
  const { children, route, breadcrumb } = props;

  let _breadcrumb = {};
  // 根据传入参数是breadcrumb或者route判断用那种模式解析
  if (breadcrumb) {
    _breadcrumb = breadcrumb;
  } else if (route) {
    _breadcrumb = {
      routes: [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        {
          path: route.path,
          breadcrumbName: route.name,
        },
      ],
    };
  }

  const itemRender = (route: any, params: any, routes: any) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <div>
      <PageHeader
        style={{
          padding: '16px',
          border: '1px solid rgb(235, 237, 240)',
          background: '#fff',
        }}
        title=""
        breadcrumb={{ itemRender, ..._breadcrumb }}
      />
      <div style={{ margin: 24 }}>{children}</div>
    </div>
  );
};
export default PageHeaderWrapper;
