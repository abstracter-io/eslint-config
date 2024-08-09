const eslint = require('@eslint/js');
const nodePlugin = require('eslint-plugin-n');
const promisePlugin = require('eslint-plugin-promise');
const stylisticPlugin = require('@stylistic/eslint-plugin');

const nodePluginConfigs = nodePlugin.configs['flat/mixed-esm-and-cjs'];

// See https://github.com/eslint-community/eslint-plugin-n/issues/327
for (const config of nodePluginConfigs) {
  delete config.languageOptions?.sourceType;
}

module.exports = {
  base: [
    // https://github.com/eslint-community/eslint-plugin-promise
    promisePlugin.configs['flat/recommended'],

    // https://eslint.style/
    stylisticPlugin.configs.customize({
      indent: 2,
      semi: true,
    }),

    // https://github.com/eslint-community/eslint-plugin-n
    ...nodePluginConfigs,

    // https://github.com/eslint/eslint/tree/main/packages/js
    eslint.configs.recommended,

    { ignores: ['lib', 'build'] },

    {
      rules: {
        // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module
        "no-restricted-exports": ["error", {
          'restrictDefaultExports': {
            'named': true,
            'direct': true,
            'namedFrom': true,
            'defaultFrom': true,
            'namespaceFrom': true,
          }
        }]
      }
    },

    // Enable default exports for cosmic configs
    {
      files: ["*.config.js"],
      rules: {
        "no-restricted-exports": "off",
      }
    }
  ],
};
