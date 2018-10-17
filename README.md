# .env

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]
[![Greenkeeper][greenkeeper-img]][greenkeeper]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/dotenv.svg
[npm]:             https://www.npmjs.com/package/@tadashi/dotenv
[ci-img]:          https://travis-ci.org/lagden/dotenv.svg
[ci]:              https://travis-ci.org/lagden/dotenv
[coveralls-img]:   https://coveralls.io/repos/github/lagden/dotenv/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/dotenv?branch=master
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[greenkeeper-img]: https://badges.greenkeeper.io/lagden/dotenv.svg
[greenkeeper]:     https://greenkeeper.io/

-----

.env reader

## Install

```
$ npm i -S @tadashi/dotenv
```


## Usage


```js
require('@tadashi/dotenv')()

console.log(process.env.DOTENV)
// => awesome
```


## License

MIT © [Thiago Lagden](http://lagden.in)
