const config = {
  env: {
    node: true,
  },

  plugins: [
    "eslint-plugin-node",
  ],

  extends: [
    "@abstracter/eslint-config/javascript",

    "plugin:node/recommended",
  ],
};

module.exports = config;
