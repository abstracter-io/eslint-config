const config = {
  plugins: [
    "eslint-plugin-react-hooks",
  ],

  extends: [
    "@abstracter/eslint-config/jsx",

    "plugin:react-hooks/recommended",
  ],
};

module.exports = config;
