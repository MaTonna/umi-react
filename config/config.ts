import { IConfig } from 'umi-types';

const config: IConfig = {
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/login',
          component: './login',
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],

          routes: [
            {
              path: '/',
              component: './index',
            },
            {
              name: '机构管理',
              path: '/organization',
              routes: [
                {
                  name: '管理',
                  icon: 'table',
                  path: '/organization/salesman-query',
                  component: './organization/salesman-query',
                },
              ],
            },
            {
              path: '/exception',
              routes: [
                {
                  name: '403',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
          ],
        },
        {
          component: '404',
        },
      ],
    },
  ],
  plugins: [
    ['umi-plugin-domi', {}],
    [
      'umi-plugin-web',
      {
        antd: true,
        dva: false,
        dynamicImport: { webpackChunkName: true },
        title: '工作台',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://worker.game.kkbuluo.net',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
};

export default config;
