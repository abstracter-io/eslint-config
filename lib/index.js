const { base } = require('./base');
const { react } = require('./react');
const { typescript } = require('./typescript');

/*
 * NOTE: these must stay plain properties on the object literal.
 * cjs-module-lexer only detects named exports from this exact shape, and
 * consumers import them by name from ESM flat configs
 * (`import { typescript } from '@abstracter/eslint-config'`).
 * Getters or Object.defineProperty would silently break that.
 */
module.exports = {
  base,
  react,
  typescript,
};
