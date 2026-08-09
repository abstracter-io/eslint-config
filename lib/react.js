const globals = require('globals');

const { typescript } = require('./typescript');

/*
 * eslint-plugin-react and eslint-plugin-react-hooks are optional peers: they are
 * only needed by the `react` config, and eslint-plugin-react caps its own eslint
 * peer at ^9.7, so depending on them outright makes this package unresolvable for
 * anyone on eslint 10. Consumers of `react` install them; everyone else does not.
 */
const optionalRequire = (id) => {
  try {
    return require(id);
  }
  catch {
    return null;
  }
};

const reactPlugin = optionalRequire('eslint-plugin-react');
const reactHooksPlugin = optionalRequire('eslint-plugin-react-hooks');

/**
 * use react-axe && eslint-plugin-jsx-a11y
 * https://web.dev/articles/accessibility-auditing-react
 *
 * 'eslint-plugin-jsx-a11y' does not support eslint v9
 * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/pull/1009
 */

/*
 * The package peer range allows eslint 9 or 10, but that is only true of the
 * `base` and `typescript` configs. eslint-plugin-react (7.37.5, latest) declares
 * `eslint: "^3 || ... || ^9.7"` and still calls the removed `context.getFilename()`,
 * so its rules die on eslint 10 with the unhelpful
 * `TypeError: contextOrFilename.getFilename is not a function`.
 *
 * `react` has to stay a plain property on the exports object (a getter is not
 * detected as a named export by cjs-module-lexer, which would break
 * `import { react } from '@abstracter/eslint-config'`), so this module is always
 * loaded eagerly via ./index.js. It therefore must not throw at require time —
 * that would take `base` and `typescript` consumers down on eslint 10 too.
 *
 * Instead the react-specific blocks are swapped for one rule that states the
 * problem, so the failure is actionable instead of a plugin stack trace.
 * Drop this once eslint-plugin-react ships eslint 10 support.
 */
const parseEslintMajor = () => {
  try {
    return Number.parseInt(require('eslint/package.json').version, 10);
  }
  catch {
    // eslint is a peer dependency - if it cannot be resolved, assume it is fine
    return null;
  }
};

const eslintMajor = parseEslintMajor();
const eslintSupportsReact = eslintMajor === null || eslintMajor < 10;
const pluginsInstalled = Boolean(reactPlugin && reactHooksPlugin);
const reactPluginsSupported = eslintSupportsReact && pluginsInstalled;

const unsupportedMessage = eslintSupportsReact
  ? '@abstracter/eslint-config: the "react" config needs eslint-plugin-react and '
  + 'eslint-plugin-react-hooks, which are optional peer dependencies. '
  + 'Install them as devDependencies to lint react code.'
  : `@abstracter/eslint-config: the "react" config does not support eslint ${eslintMajor}. `
    + 'eslint-plugin-react has not shipped eslint 10 support (its peer range stops at ^9.7). '
    + 'Pin eslint to ^9 to lint react code; the "base" and "typescript" configs work on both 9 and 10.';

const unsupportedNotice = {
  name: 'react/unsupported-eslint',
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'abstracter-react-compat': {
      rules: {
        'unsupported-eslint': {
          meta: { schema: [] },
          create: context => ({
            Program: node => context.report({ node, message: unsupportedMessage }),
          }),
        },
      },
    },
  },
  rules: {
    'abstracter-react-compat/unsupported-eslint': 'error',
  },
};

// built lazily - reactPlugin/reactHooksPlugin are null when the peers are absent
const buildReactPluginConfigs = () => [
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
];

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

    ...(reactPluginsSupported ? buildReactPluginConfigs() : [unsupportedNotice]),
  ],
};
