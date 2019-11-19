module.exports = {
  extends: ['stylelint-config-domi'],
  ignoreFiles: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
  syntax: 'less',
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local'],
      },
    ],
    'no-duplicate-selectors': null,
  },
};
