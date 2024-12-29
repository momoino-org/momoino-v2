import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigReactQuery from '@tanstack/eslint-plugin-query';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintCofig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  ...eslintConfigReactQuery.configs['flat/recommended'],
  {
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'consistent-return': 'error',
      eqeqeq: 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'error',
      strict: 'error',
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'require-atomic-updates': 'error',
      curly: 'error',
      'dot-notation': 'error',
      'max-params': ['error', 3],
      'no-else-return': 'error',
      'no-param-reassign': 'error',
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',

      'no-useless-catch': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'no-dupe-keys': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error"
    },
  },
  eslintConfigPrettier,
];

export default eslintCofig;
