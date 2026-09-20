import globals from 'globals';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import typescriptConfig from './typescript.js';

const { typescript } = typescriptConfig;

/*
 * This module is ESM (.mjs) while the rest of the package is CommonJS, and it is
 * reachable only through the `@abstracter/eslint-config/react` subpath.
 *
 * @eslint-react ships ESM only: its `exports` map declares an `import` condition
 * and nothing else, so `require()` fails with ERR_PACKAGE_PATH_NOT_EXPORTED even
 * on node's require(esm). Isolating it behind a subpath keeps `base` and
 * `typescript` requireable CommonJS and keeps the ~150 transitive packages of
 * @eslint-react out of installs that never lint react.
 *
 * @eslint-react replaces eslint-plugin-react, which is stuck at 7.37.5 (April
 * 2025), caps its eslint peer at ^9.7, and still calls the removed
 * `context.getFilename()`. See jsx-eslint/eslint-plugin-react#3977.
 */

/*
 * Hook rules come from eslint-plugin-react-hooks, not from @eslint-react: v7 is
 * maintained by the react team and its rules are backed by the react compiler
 * (purity, immutability, refs, set-state-in-effect). @eslint-react reimplements
 * nine of them, so those are turned off here to avoid double reporting. The
 * plugin ships the inverse switch (`disable-conflict-eslint-plugin-react-hooks`)
 * for people who prefer its versions.
 */
const duplicatedByReactHooks = {
  '@eslint-react/error-boundaries': 'off',
  '@eslint-react/exhaustive-deps': 'off',
  '@eslint-react/purity': 'off',
  '@eslint-react/rules-of-hooks': 'off',
  '@eslint-react/set-state-in-effect': 'off',
  '@eslint-react/set-state-in-render': 'off',
  '@eslint-react/static-components': 'off',
  '@eslint-react/unsupported-syntax': 'off',
  '@eslint-react/use-memo': 'off',
};

export const react = [
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

  // https://eslint-react.xyz
  {
    ...eslintReact.configs['recommended-typescript'],

    name: '@eslint-react',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslintReact.configs['recommended-typescript'].rules,
      ...duplicatedByReactHooks,
    },
  },

  // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
  {
    files: ['**/*.{ts,tsx}'],
    name: 'react-hooks',
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
];
