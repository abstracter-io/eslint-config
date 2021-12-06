const config = {
  extends: [
    "@abstracter/eslint-config/node",
    "@abstracter/eslint-config/typescript",
  ],

  rules: {
    // Handled by TypeScript
    "node/no-missing-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
  },
};

module.exports = config;
