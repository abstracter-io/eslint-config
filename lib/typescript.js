const typescriptEslint = require('typescript-eslint');

const { base } = require('./base');

// Consider @stylistic/eslint-plugin-ts vs typescript-eslint
// https://eslint.style/packages/ts
// https://typescript-eslint.io/getting-started/

module.exports = {
  typescript: [
    ...base,

    ...typescriptEslint.config({
      files: ['**/*.ts'],
      extends: [
        ...typescriptEslint.configs.strict,
        ...typescriptEslint.configs.stylistic,
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        }],

        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    }),

    {
      files: ['tests/**/**.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
