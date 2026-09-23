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

The `typescript` config cannot lint with TypeScript 7 installed as `typescript`.
The TS 7 npm package exports only `lib/version.cjs`, so `require('typescript')`
no longer yields a compiler API, and `typescript-eslint` throws on it by design -
its peer range is still `>=4.8.4 <6.1.0`. TS 7.1 is expected to ship a stable
API; track
[typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940).

You can still build with TS 7 today, by giving the compiler and the API separate
names:

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

`tsc` then resolves to 7.x while `require('typescript')` resolves to 6.x with the
classic API intact, which is what this config needs. digitalfleet's web-app runs
this layout: typecheck, lint, build and test all pass, and `tsc` CPU time dropped
from 4.85s to 1.85s.

An earlier version of this section said not to do that, on the grounds that
`@typescript/typescript6` depends on `@typescript/old` (itself `npm:typescript@^6`),
which also declares a `tsc` binary, so two packages would compete for
`node_modules/.bin/tsc` with npm's link order deciding. That does not hold up:
npm flattens the `@typescript/old` alias into plain `node_modules/typescript`, so
`@typescript/native` ends up the only package contributing the bin, and the
lockfile pins it. Re-verified across a clean `npm ci`.

Note that `typescript` still resolves to 6.x for every API consumer in the
workspace. That is the point of the layout, not a side effect - but it does mean
a repo cannot claim to have "moved to TS 7" while this is in place. Other tooling
that reads the compiler API is in the same position:
[`@swc-node/register` crashes at require time](https://github.com/swc-project/swc-node/issues/1049)
on TS 7, so repos using it need the alias too.
