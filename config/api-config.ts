const config = {
  // 本地
  development: {
    publicPath: '/',
    apiUrl: 'http://worker.onlinetreat.net',
  },
  // 测试环境
  qa: {
    publicPath: 'http://img-worker.onlinetreat.net/',
    apiUrl: 'http://worker.onlinetreat.net',
  },
  // 线上
  production: {
    publicPath: 'http://img-worker.onlinetreat.net/',
    apiUrl: 'http://worker.onlinetreat.net',
  },
  baseUrl: '',
};
const env = process.env.PROJECT_ENV as 'qa' | 'development' | 'production';
config.baseUrl = config[env].apiUrl;
export default config;
