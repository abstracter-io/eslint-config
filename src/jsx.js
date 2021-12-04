const config = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    "@abstracter/eslint-config/javascript",
  ],

  rules: {
    "jsx-quotes": ["error", "prefer-double"],
  },
};

module.exports = config;
