# eslint-config

Common eslint configuration for common env/stacks

## Install

> npm install --save-dev eslint @abstracter/eslint-config eslint-plugin-import eslint-plugin-node eslint-plugin-promise

## Usage

#### Javascript
A general config for javascript (no rules for a specific environment or stack)

eslint config example:

```json
{
  "extends": "@abstracter/eslint-config/javascript"
}
```

This config requires:
- [eslint-config-standard](https://github.com/standard/eslint-config-standard)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)


**NOTE**:  
This config uses .  

#### TypeScript
A config for code written in TypeScript.

eslint config example:

```json
{
  "extends": "@abstracter/eslint-config/typescript"
}
```

This config requires:
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint)
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

Make sure to install it:
> npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

#### Browser
A config for code expected to run in a browser environment.

eslint config example:

```json
{
  "extends": ["@abstracter/eslint-config/browser"]
}
```

#### Node.JS
A config for code expected to run in a node environment.

eslint config example:

```json
{
  "extends": ["@abstracter/eslint-config/node"]
}
```

This config uses [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) recommend config.

#### JSX
A config for code written in JSX.

eslint config example:

```json
{
  "extends": ["@abstracter/eslint-config/jsx"]
}
```

#### React
A config for code written using React.

eslint config example:

```json
{
  "extends": ["@abstracter/eslint-config/react"]
}
```

The config uses [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) recommend config.

Make sure to install:
> npm install --save-dev eslint-plugin-react-hooks

## Mix & Match configs

Use more than a single config to achieve a multipurpose config.  

Using TypeScript, React and Jest:

```json
{
  "extends": [
    "@abstracter/eslint-config/typescript",
    "@abstracter/eslint-config/react",
    "@abstracter/eslint-config/jest"
  ]
}
```
