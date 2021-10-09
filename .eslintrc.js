module.exports = {
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb' // airbnb react module
  ].map(require.resolve)
  .concat(['plugin:jest/recommended']),
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore'
      }
    ],
    'arrow-body-style': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'error',
    'function-paren-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'error',
    'implicit-arrow-linebreak': 'off',
    'max-len': ['error', { code: 120 }],
    'no-console': 'error',
    'no-confusing-arrow': 'off',
    'no-debugger': 'error',
    'no-mixed-operators': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-shadow': ['error'],
    'no-throw-literal': 'error',
    'no-underscore-dangle': 'off',
    'no-unreachable': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': ['error', 'nofunc'], // functions are hoisted
    'object-curly-newline': 'off',
    'template-curly-spacing': 'off',
    'one-var': 'off',
    'operator-linebreak': 'off',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'space-in-parens': 'error',
    quotes: 'error',
    semi: 'error',
    indent: 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.js'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'error',
    'react/require-default-props': 'off'
  }
};
