const config = {
  // https://github.com/typescript-eslint/typescript-eslint
  parser: "@typescript-eslint/parser",

  plugins: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "@typescript-eslint/eslint-plugin",
  ],

  extends: [
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    // https://git.io/JMDdn
    "@typescript-eslint/ban-ts-comment": ["error", {
      "ts-expect-error": "allow-with-description",
    }],
  },

  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-useless-constructor": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
      },
    },

    {
      files: ["*.js"],

      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};

module.exports = config;
