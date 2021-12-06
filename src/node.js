const config = {
  env: {
    node: true,
  },

  extends: [
    "@abstracter/eslint-config/javascript",

    "plugin:node/recommended",
  ],

  plugins: [
    "eslint-plugin-node",
  ],

  rules: {
    // Enabled via overrides
    "node/no-unpublished-require": "off",
  },

  overrides: [
    {
      files: "src/**",

      rules: {
        "node/no-unpublished-require": "error",
      },
    },
  ],
};

module.exports = config;
