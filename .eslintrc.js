module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    // 'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 'off',
    // 'prettier/prettier': ['error', { semi: false, singleQuote: true, useTabs: true }],
  },
}
