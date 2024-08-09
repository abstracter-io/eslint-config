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
