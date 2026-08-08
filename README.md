# eslint-config

Common eslint configuration for common env/stacks

## Install

> npm install --save-dev eslint @abstracter/eslint-config

## Example

```js
const { base, typescript } = require('@abstracter/eslint-config');

// This assums flat config
module.exports = [
  ...base,
  ...typescript,
];
```

## Compatibility

| Export       | ESLint 9 | ESLint 10 |
| ------------ | -------- | --------- |
| `base`       | yes      | yes       |
| `typescript` | yes      | yes       |
| `react`      | yes      | **no**    |

`react` is stuck on ESLint 9. `eslint-plugin-react` has not shipped ESLint 10
support — its peer range stops at `^9.7` and its rules still call the removed
`context.getFilename()`.

On ESLint 10 the `react` export drops the `eslint-plugin-react` and `react-hooks`
blocks and reports one explanatory error per file instead, so you get an
actionable message rather than
`TypeError: contextOrFilename.getFilename is not a function`. The `base` and
`typescript` rules it builds on still apply. Importing the package is always
safe — only *using* `react` on ESLint 10 is degraded.

### TypeScript 7

TypeScript 7 is **not supported**, and this is not a configuration problem you
can work around here. The TS 7 npm package exports only `lib/version.cjs`, so
`require('typescript')` no longer yields a compiler API. `typescript-eslint`
throws on it by design, and other tooling that reads the API — `@swc-node/register`,
for one — fails too. Stay on `typescript@^6` to lint.

Do **not** reach for the side-by-side alias trick
(`typescript: "npm:@typescript/typescript6"` alongside TS 7 under another name).
`@typescript/typescript6` depends on `@typescript/old`, which also declares a
`tsc` binary, so two packages compete for `node_modules/.bin/tsc` and npm's link
order decides the winner. It is not pinned by the lockfile: the same recipe
resolved to TS 7 in one repo and TS 6 in another, meaning CI can silently build
with a different compiler than your machine. Track
[typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)
for real TS 7 support.
