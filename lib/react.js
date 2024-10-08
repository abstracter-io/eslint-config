const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

const { typescript } = require('./typescript');

/**
 * use react-axe && eslint-plugin-jsx-a11y
 * https://web.dev/articles/accessibility-auditing-react
 *
 * 'eslint-plugin-jsx-a11y' does not support eslint v9
 * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/pull/1009
 */

module.exports = {
  react: [
    ...typescript,

    // setup globals
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        globals: {
          // ...globals.serviceworker,
          ...globals.browser,
        },
      },

      rules: {
        // https://github.com/eslint-community/eslint-plugin-n/issues/314
        'n/no-missing-import': 'off',
      },
    },

    // https://github.com/jsx-eslint/eslint-plugin-react
    {
      ...reactPlugin.configs.flat.recommended,

      name: 'react',
      files: ['**/*.{ts,tsx}'],
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    // ...reactPlugin.configs.flat["jsx-runtime"], // WTF is the diff

    // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    // https://github.com/facebook/react/issues/28313
    {
      files: ['**/*.{ts,tsx}'],
      name: 'react-hooks',
      plugins: {
        'react-hooks': reactHooksPlugin,
      },
      rules: reactHooksPlugin.configs.recommended.rules,
    },
  ],
};
