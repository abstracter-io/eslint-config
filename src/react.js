const config = {
  plugins: [
    "eslint-plugin-react-hooks",
  ],

  extends: [
    "plugin:react-hooks/recommended",
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    "jsx-quotes": ["error", "prefer-double"],
  },
};

module.exports = config;
