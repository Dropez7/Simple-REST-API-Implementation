module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    'no-extraneus-dependencies': 'off',
    'camelcase': 'off',
  },
};
