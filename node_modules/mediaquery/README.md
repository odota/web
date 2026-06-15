[![Build Status](https://travis-ci.org/axyz/mediaquery.svg?branch=master)](https://travis-ci.org/axyz/mediaquery)
[![Coverage Status](https://coveralls.io/repos/axyz/mediaquery/badge.svg?branch=master)](https://coveralls.io/r/axyz/mediaquery?branch=master)
![Dependencies Status](https://david-dm.org/axyz/mediaquery.svg)

# mediaquery
Turns human readable breakpoints into correct mediaqueries.

This is particularly useful when working with
[window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
or when you work with CSS dinamically using JavaScript.

## Install
If you are using nodejs (but also browserify, webpack, etc...) you can simply
use npm:

    npm install mediaquery

then you can

    var MQ = require('mediaquery');

By the way you if you are not using node, you may use bower

    bower install mediaquery

then you can use it from `window.MQ` or require it using AMD

## Show me the code!
Assuming you have an object to describe the mediaqueries you need such as
```javascript
var myMedias = {
  small: 300,
  medium: 600,
  tablet: 'tablet media query',
  big: 1024,
  huge: Infinity
};
```

Note that all the numerical values (Infinity included) will be automatically
sorted in the correct order, while all the strings will be considered custome
media queries; every other type of values will be stripped out.

So `small: 300` means that my `small` media query will span from 0 to 300px,
while `medium` will be from 301px to 600px; finally `huge` will go from 1025px
to... Infinitely large screens.

If you do not specify an Infinity breakpoint a `default` breakpoint will be
created spanning from the biggest available breakpoint to infinity.

### asObject(obj)
You can use `asObject` to get back a similar object where the numbers for your
breakpoints are substituted with correct mediaqueries.

e.g.
```javascript
var MQ = require('mediaqueries');

MQ.asObject(myMedias);
```

will return
```javascript
{
  small: 'screen and (max-width: 300px)',
  medium: 'screen and (min-width: 301px) and (max-width: 600px)',
  big: 'screen and (min-width: 601px) and (max-width: 1024px)',
  huge: 'screen and (min-width: 1025px)',
  tablet: 'tablet media query'
}
```

### asArray(obj)
You can also have an array of couples ['name', 'mediaquery'] in output.

e.g.
```javascript
MQ.asArray(myMedias);
```

will return
```javascript
[
  ['small', 'screen and (max-width: 300px)'],
  ['medium', 'screen and (min-width: 301px) and (max-width: 600px)'],
  ['big', 'screen and (min-width: 601px) and (max-width: 1024px)'],
  ['huge', 'screen and (min-width: 1025px)'],
  ['tablet', 'tablet media query']
]
```

### getBreakPoints(obj)
If you need to filter out the numerical breakpoints from a mixed object you can
use `getBreakPoints` e.g.

```javascript
MQ.getBreakPoints(myMedias);
```

will return
```
{
  small: 300,
  medium: 600,
  big: 1024,
  huge: Infinity // remember that Infinity is a number
}
```

### getCustomQueries(obj)
In the same way you may need to filter out all the custom strings e.g.

```javascript
MQ.getCustomQueries(myMedias);
```

will return
```
{
  tablet: 'tablet media query'
}
```

