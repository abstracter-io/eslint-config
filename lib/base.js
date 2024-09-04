const eslint = require('@eslint/js');
const nodePlugin = require('eslint-plugin-n');
const promisePlugin = require('eslint-plugin-promise');
const stylisticPlugin = require('@stylistic/eslint-plugin');

/*
 * Consider:
 * - https://github.com/lydell/eslint-plugin-simple-import-sort
 */

module.exports = {
  base: [
    // https://github.com/eslint-community/eslint-plugin-promise
    promisePlugin.configs['flat/recommended'],

    // https://eslint.style/
    {
      name: '@stylistic/eslint-plugin',
      ...stylisticPlugin.configs.customize({
        jsx: true,
        semi: true,
        indent: 2,
      }),
    },

    // https://github.com/eslint-community/eslint-plugin-n
    ...nodePlugin.configs['flat/mixed-esm-and-cjs'].map((config) => {
      // See https://github.com/eslint-community/eslint-plugin-n/issues/327
      delete config.languageOptions?.sourceType;

      return {
        ...config,
        name: 'n/flat/mixed-esm-and-cjs',
      };
    }),

    // https://github.com/eslint/eslint/tree/main/packages/js
    {
      ...eslint.configs.recommended,
      name: '@eslint/js/recommended',
    },

    // ignore common directories
    {
      ignores: ['build', 'dist'],
    },

    // disable default export
    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module
    {
      rules: {
        'no-restricted-exports': ['error', {
          restrictDefaultExports: {
            named: true,
            direct: true,
            namedFrom: true,
            defaultFrom: true,
            namespaceFrom: true,
          },
        }],
      },
    },

    // enable default export for cosmic configs
    {
      files: ['*.config.js', '*.config.ts'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
};
