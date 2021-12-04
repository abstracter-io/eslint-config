const config = {
  plugins: [
    "eslint-plugin-jest",
  ],

  extends: [
    "@abstracter/eslint-config/javascript",

    "plugin:jest/recommended",
  ],

  rules: {
    // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-expect.md
    "jest/valid-expect": ["error", { maxArgs: 2 }],
  },
};

module.exports = config;
