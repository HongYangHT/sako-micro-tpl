module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    // "eslint-config-ali/vue", // NOTE: 比较严格
    // "standard",
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended'
    // "plugin:standard/recommended"
  ],
  plugins: ['vue', 'jest'],
  globals: {},
  rules: {
    // NOTE: for vue eslint
    // eslint-plugin-vue
    // Priority A: Essential
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error',
    'vue/no-async-in-computed-properties': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-reserved-keys': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-template-key': 'warn',
    'vue/no-textarea-mustache': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/require-component-is': 'warn',
    'vue/require-prop-type-constructor': 'warn',
    'vue/require-render-return': 'error',
    'vue/require-v-for-key': 'error',
    'vue/require-valid-default-prop': 'warn',
    'vue/return-in-computed-property': 'error',
    'vue/use-v-on-exact': 'error',
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-text': 'error',
    // NOTE: prettier
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        semi: false,
        tabWidth: 2,
        useTabs: false,
        alwaysParens: 'avoid'
      }
    ],
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制不使用分号结尾
    semi: ['error', 'never']
  }
}
