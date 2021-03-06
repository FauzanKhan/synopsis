module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': 'off',
  },
};
