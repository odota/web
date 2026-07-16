# read-file-relative
[![Build Status](https://api.travis-ci.org/inikulin/read-file-relative.svg)](https://travis-ci.org/inikulin/read-file-relative)

*Read files with path relative to the current module without annoying boilerplate code*

~~Well, I've expected @sindresorhus has a module for this, but he didn't.~~

## What's going on?

If you have code like this:
```js
var fs   = require('fs');
var path = require('path');

var data = fs.readFileSync(path.join(__dirname, '/my-awesome-file')).toString();
```

Now you can replace it with:
```js
var readSync = require('read-file-relative').readSync;

var data = readSync('/my-awesome-file');
```

That's it.

You want a plain buffer instead of string? No problem - just use optional second argument:
```js
var readSync = require('read-file-relative').readSync;

var buffer = readSync('/my-awesome-file', true);
```

You like it the async way (didn't you :wink:)? Do it this way:
```js
var read = require('read-file-relative').read;

read('/my-awesome-file', function(err, content) {
   ...
});
```

You can pass options or encoding like for regular `fs.readFile`:
```js
var read = require('read-file-relative').read;

read('/my-awesome-file', 'utf8', function(err, content) {
   ...
});
```

BTW, you can just convert given path to absolute:
```js
var toAbsPath = require('read-file-relative').toAbsPath;

var absPath = toAbsPath('/my-awesome-file');
```

## Install
```
npm install read-file-relative
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
