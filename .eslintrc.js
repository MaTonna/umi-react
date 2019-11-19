module.exports = {
  extends: ['domi', 'domi/react', 'domi/typescript'],
  env: {
    // 这里填入你的项目用到的环境
    // 它们预定义了不同环境的全局变量
    browser: true,
    node: true,
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    // false 表示这个全局变量不允许被重新赋值
    CONFIG: true,
    API: true,
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'no-invalid-this': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
