const { base } = require('./base');
const { typescript } = require('./typescript');

/*
 * NOTE: these must stay plain properties on the object literal.
 * cjs-module-lexer only detects named exports from this exact shape, and
 * consumers import them by name from ESM flat configs
 * (`import { typescript } from '@abstracter/eslint-config'`).
 * Getters or Object.defineProperty would silently break that.
 */

/*
 * `react` is deliberately absent: it lives at the `@abstracter/eslint-config/react`
 * subpath because @eslint-react is ESM only and cannot be require()d. Re-exporting
 * it here would make this module ESM too, and would pull @eslint-react's dependency
 * tree into every install that only lints node code.
 */
module.exports = {
  base,
  typescript,
};
