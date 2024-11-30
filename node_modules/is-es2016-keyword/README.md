# is-es2016-keyword
[![Build Status](https://api.travis-ci.org/inikulin/is-es2016-keyword.svg)](https://travis-ci.org/inikulin/is-es2016-keyword)

Determine if string is an ES2016 keyword.

## Install
```
npm install os-is-es2016-keyword
```

## Usage
```js
const isES2016Keyword = require('is-es2016-keyword');

console.log(isES2016Keyword('async')); // > true
console.log(isES2016Keyword('class')); // > true
console.log(isES2016Keyword('yo'));    // > false
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)

