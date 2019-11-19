import React, { useState } from 'react';
import Link from '@/components/Link';
import classnames from 'classnames';
import { Layout, Menu, Icon, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const { Header, Content, Sider } = Layout;
import HeaderAction from './HeaderAction';
import styles from './BasicLayout.less';
import logo from '@/assets/logo.png';
import useLayoutMenu from '@/hooks/useLayoutMenu';

interface BasicLayoutProps {
  children: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children } = props;

  const [collapsed, setCollapsed] = useState(false);
  const {
    menuTopList,
    menuTopSelected,
    menuSideList,
    menuSideSelected,
    selectMenuTop,
    selectMenuSide,
  } = useLayoutMenu({ routes: props.route.routes });

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.container}>
        <Sider
          style={{
            position: 'relative',
          }}
          collapsed={collapsed}
          onCollapse={collapsed => setCollapsed(collapsed)}
          className={classnames(styles.sider, 'layout-sider')}
        >
          <div className={classnames(styles.logo, 'logo')}>
            <a href="/" className={styles['logo-link']}>
              <img src={logo} className={styles['logo-icon']} />
              <span className={styles['logo-name']}>工作台</span>
            </a>
          </div>
          <Menu theme="dark" selectedKeys={menuSideSelected} style={{ lineHeight: '64px' }}>
            {menuSideList &&
              menuSideList.map(item => {
                return (
                  <Menu.Item
                    key={item.path}
                    onClick={() => {
                      selectMenuSide(item.path);
                    }}
                  >
                    <Link to={item.path}>
                      {item.icon && <Icon type={item.icon} />}
                      <span>{item.name}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>

        <Layout>
          <Header className={classnames(styles.header, 'layout-header')}>
            <div className={styles.menu}>
              <Icon
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                style={{ fontSize: 20, marginRight: 16 }}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              />
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={menuTopSelected}
                style={{ lineHeight: '64px' }}
              >
                {menuTopList &&
                  menuTopList.map(item => {
                    return (
                      <Menu.Item
                        key={item.path}
                        onClick={() => {
                          selectMenuTop(item.path);
                        }}
                      >
                        {item.name}
                      </Menu.Item>
                    );
                  })}
              </Menu>
            </div>
            <HeaderAction />
          </Header>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
