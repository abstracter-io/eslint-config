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

| Export       | Entry point                           | ESLint 9 | ESLint 10 |
| ------------ | ------------------------------------- | -------- | --------- |
| `base`       | `@abstracter/eslint-config`           | yes      | yes       |
| `typescript` | `@abstracter/eslint-config`           | yes      | yes       |
| `react`      | `@abstracter/eslint-config/react`     | **no**   | yes       |

### react

```js
import { react } from '@abstracter/eslint-config/react';

export default [
  ...react,
];
```

The `react` export lives at its own subpath and needs two optional peer
dependencies, installed by consumers that use it:

> npm install --save-dev @eslint-react/eslint-plugin eslint-plugin-react-hooks

React rules come from [@eslint-react](https://eslint-react.xyz)
(`recommended-typescript`), not from `eslint-plugin-react`, which is stuck at
7.37.5 (April 2025), caps its `eslint` peer at `^9.7` and still calls the removed
`context.getFilename()` — see
[jsx-eslint/eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977).
Rule names therefore changed wholesale: `react/no-danger` is now
`@eslint-react/dom-no-dangerously-set-innerhtml`, and any `eslint-disable`
comment naming a `react/*` rule needs rewriting. `react/prop-types` and
`react/react-in-jsx-scope` have no replacement and no longer need disabling.

Hook rules stay with `eslint-plugin-react-hooks`, maintained by the React team
and backed by the React compiler. @eslint-react reimplements nine of those rules;
they are turned off here so nothing is reported twice.

@eslint-react documents ESLint **10.3.0** as its floor, which is why `react` is
the one export that does not work on ESLint 9. `base` and `typescript` still do.

The subpath exists because @eslint-react ships ESM only — its `exports` map
declares an `import` condition and nothing else, so `require()` fails even under
node's require(esm). Keeping it behind `/react` leaves `base` and `typescript`
requireable CommonJS, and keeps ~150 transitive packages out of installs that
never lint React.

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
