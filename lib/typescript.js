const typescriptEslint = require('typescript-eslint');

const { base } = require('./base');

module.exports = {
  typescript: [
    ...base,

    // https://typescript-eslint.io/getting-started
    ...typescriptEslint.config({
      files: ['**/*.{ts,tsx}'],
      name: 'typescript-eslint',
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

    // disable common tests violations
    {
      files: ['tests/**/**.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
