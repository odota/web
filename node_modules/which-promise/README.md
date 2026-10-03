# which-promise

[![NPM version](https://img.shields.io/npm/v/which-promise.svg)](https://www.npmjs.com/package/which-promise)
[![Build Status](https://travis-ci.org/shinnn/which-promise.svg?branch=master)](https://travis-ci.org/shinnn/which-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/rru70vrrm83s9ddj?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/which-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/which-promise.svg)](https://coveralls.io/r/shinnn/which-promise)
[![Dependency Status](https://img.shields.io/david/shinnn/which-promise.svg?label=deps)](https://david-dm.org/shinnn/which-promise)
[![devDependency Status](https://img.shields.io/david/dev/shinnn/which-promise.svg?label=devDeps)](https://david-dm.org/shinnn/which-promise#info=devDependencies)

[Promisified](https://promise-nuggets.github.io/articles/07-wrapping-callback-functions.html) version of [node-which](https://github.com/npm/node-which):

> Finds the first instance of a specified executable in the PATH environment variable.

```javascript
const whichPromise = require('which-promise');

whichPromise('ls').then(resolvedPath => {
  resolvedPath; //=> '/bin/ls'
});

whichPromise('ls', {path: './'}).catch(err => {
  err.message; //=> 'not found: ls'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install which-promise
```

## API

```javascript
const whichPromise = require('which-promise');
```

### whichPromise(*cmd* [, *options*])

*cmd*: `String` (directly passed to node-which's first argument)  
*options*: `Object` (used as node-which [options](https://github.com/npm/node-which/blob/5d832a3d32b21a7f110771a3c14d5e8ee90d6706/which.js#L40))  
Return: `Object` ([Promise](https://promisesaplus.com/))

## License

[The Unlicense](./LICENSE)
