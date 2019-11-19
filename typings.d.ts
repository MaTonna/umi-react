declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'store';

interface CONFIG {
  MOCK: {
    url: string;
  };
  API: {
    url: string;
    headers: {};
  };
}
declare const CONFIG: CONFIG;
