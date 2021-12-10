const config = {
  env: {
    es6: true,
  },

  plugins: [
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
    "eslint-plugin-import",

    "eslint-plugin-promise",
  ],

  extends: [
    "eslint:recommended",

    // https://github.com/standard/eslint-config-standard
    "eslint-config-standard",

    "plugin:promise/recommended",
  ],

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },

  rules: {
    // Code Style
    // ==========
    "indent": ["error", 2, { SwitchCase: 1 }],

    "linebreak-style": [process.platform === "win32" ? "off" : "error", "unix"],

    "brace-style": ["error", "stroustrup"],

    "space-in-parens": ["error", "never"],

    "key-spacing": ["error", {
      mode: "strict",
      beforeColon: false,
      afterColon: true,
    }],

    "object-curly-spacing": ["error", "always", {
      arraysInObjects: false,
      objectsInObjects: true,
    }],

    "array-bracket-spacing": ["error", "never"],

    "comma-spacing": ["error", { before: false, after: true }],

    "semi": ["error", "always"],

    "no-tabs": ["error", { allowIndentationTabs: true }],

    "max-len": ["error", { code: 120, ignoreUrls: true }],

    "quotes": ["error", "double", { avoidEscape: true }],

    "semi-style": ["error", "last"],

    "quote-props": ["error", "consistent-as-needed"],

    "comma-dangle": ["error", "always-multiline"],

    "arrow-parens": ["error", "always"],

    "prefer-spread": ["error"],

    "default-case-last": ["error"],

    "default-param-last": ["error"],

    "prefer-rest-params": ["error"],

    "arrow-body-style": ["error", "always"],

    "object-shorthand": ["error", "always"],

    "switch-colon-spacing": ["error", { after: true, before: false }],

    "template-curly-spacing": ["error", "never"],

    "array-element-newline": ["error", "consistent"],

    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],

    "grouped-accessor-pairs": ["error", "getBeforeSet"],

    "max-statements-per-line": ["error", { max: 1 }],

    "prefer-numeric-literals": ["error"],

    "space-before-function-paren": "off",

    "one-var-declaration-per-line": ["error"],

    "function-call-argument-newline": ["error", "consistent"],

    "padding-line-between-statements": ["error", {
      blankLine: "always",
      prev: "multiline-block-like",
      next: "*",
    }],

    // Code Quality
    // ============
    "radix": ["error", "always"],

    "no-alert": ["error"],

    "max-depth": ["warn"],

    "no-bitwise": ["error"],

    "max-params": ["warn", { max: 4 }],

    "complexity": ["warn"],

    "no-lonely-if": ["error"],

    "guard-for-in": ["error"],

    "default-case": ["error"],

    "for-direction": ["error"],

    "no-else-return": ["error", {
      allowElseIf: false,
    }],

    "no-script-url": ["error"],

    "no-multi-assign": ["error"],

    "no-return-await": ["error"],

    "no-await-in-loop": ["error"],

    "block-scoped-var": ["error"],

    "no-useless-concat": ["error"],

    "no-implicit-globals": ["error"],

    "operator-assignment": ["error", "always"],

    "max-nested-callbacks": ["error", 2],

    "no-constructor-return": ["error"],

    "no-restricted-globals": ["error", "event"],

    "no-promise-executor-return": ["error"],

    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module
    "import/no-default-export": ["error"],
  },
};

module.exports = config;
