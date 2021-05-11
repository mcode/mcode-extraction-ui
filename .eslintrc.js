module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
