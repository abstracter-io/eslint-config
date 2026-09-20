const eslint = require('@eslint/js');
const nodePlugin = require('eslint-plugin-n');
const promisePlugin = require('eslint-plugin-promise');
const stylisticPlugin = require('@stylistic/eslint-plugin');

/*
 * Consider:
 * - https://github.com/lydell/eslint-plugin-simple-import-sort
 */

const stylisticConfig = stylisticPlugin.configs.customize({
  jsx: true,
  semi: true,
  indent: 2,
});

/*
 * @stylistic v5 narrowed the `indent` ignoredNodes list that v2 shipped,
 * dropping the decorator selectors. Without them, decorated parameters
 * (class-validator DTOs, DI constructors) report bogus indent errors, so the
 * dropped selectors are merged back on top of whatever v5 provides.
 */
const [indentSeverity, indentSize, indentOptions] = stylisticConfig.rules['@stylistic/indent'];

const indentIgnoredNodes = [
  ...new Set([
    ...indentOptions.ignoredNodes ?? [],
    'TSTypeParameterInstantiation',
    'FunctionExpression > .params[decorators.length > 0]',
    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
  ]),
];

module.exports = {
  base: [
    // https://github.com/eslint-community/eslint-plugin-promise
    promisePlugin.configs['flat/recommended'],

    // https://eslint.style/
    {
      name: '@stylistic/eslint-plugin',
      ...stylisticConfig,
      rules: {
        ...stylisticConfig.rules,

        /*
         * Pinned across the @stylistic v2 -> v5 upgrade to keep the house style
         * stable. v5 changed these defaults, and adopting them as-is would force
         * a reformat of every consumer repo for no benefit.
         *
         * - operator-linebreak: v5 started checking TS type aliases, which turns
         *   `type X =` followed by a newline into an error. Keep assignment `=`
         *   at the end of the line; every other operator still leads the next.
         * - generator/yield-star-spacing: v5 enables these with a single
         *   spacing rule for every generator form. The established style splits
         *   by form: `function* decode()` binds the star to the keyword, while
         *   a method writes `async *list()`. Yield stays spaced: `yield * x`.
         */
        '@stylistic/operator-linebreak': ['error', 'before', {
          overrides: {
            '=': 'after',
          },
        }],

        '@stylistic/generator-star-spacing': ['error', {
          named: { before: false, after: true },
          anonymous: { before: false, after: true },
          method: { before: true, after: false },
        }],

        '@stylistic/yield-star-spacing': ['error', 'both'],

        '@stylistic/indent': [indentSeverity, indentSize, {
          ...indentOptions,
          ignoredNodes: indentIgnoredNodes,
        }],
      },
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

    /*
     * enable default export for cosmic configs
     *
     * .mjs and .cjs are in the list because a config file has to carry the
     * extension that matches its module system when it disagrees with the
     * package type - vitest.config.mjs inside a commonjs package, for one.
     */
    {
      files: ['*.config.js', '*.config.cjs', '*.config.mjs', '*.config.ts', '*.config.mts', '*.config.cts'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
};
