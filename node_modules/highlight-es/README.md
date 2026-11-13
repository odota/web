# highlight-es
[![Build Status](https://api.travis-ci.org/inikulin/highlight-es.svg)](https://travis-ci.org/inikulin/highlight-es)

*Highlight ECMAScript syntax for the console or any other medium.*

## Install
```
npm install highlight-es
```

## Usage
```js
const highlight = require('highlight-es');

function testFunc () {
    const re    = /(.+) awesome$/;
    const match = 'You are awesome'.match(re);

    return match[1];
}

const code = testFunc.toString();

console.log('\n' + highlight(code));
```

 ⬇

![example](https://raw.githubusercontent.com/inikulin/highlight-es/master/media/example.png)


You can pass custom renderer to target other medium, e.g.:
```js
highlight(code, {
    string:     str => ...,
    punctuator: str => ...,
    keyword:    str => ...,
    number:     str => ...,
    regex:      str => ...,
    comment:    str => ...,
    invalid:    str => ...
});
```

## Related
[is-es2016-keyword](https://github.com/inikulin/is-es2016-keyword) - Determine if string is an ES2016 keyword.

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
