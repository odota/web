# bin-v8-flags-filter
[![Build Status](https://api.travis-ci.org/inikulin/bin-v8-flags-filter.svg)](https://travis-ci.org/inikulin/bin-v8-flags-filter)

*Filters out v8 flags for your Node.js CLIs.*

Filters out well-known v8 flags given to your app and spawns new process with v8 flags passed to Node.js and the rest
of the args passed to your actual CLI. Basically an extraction of related [mocha code](https://github.com/mochajs/mocha/blob/master/bin/mocha).

## Install
```
npm install bin-v8-flags-filter
```

## Usage
*In JS file specified as `bin` in your `package.json`:*
```js
const v8FlagsFilter = require('bin-v8-flags-filter');
const path = require('path');

const cliPath = path.join(__dirname, './cli.js'); // Path to your actual CLI file that contains app code.

v8FlagsFilter(cliPath);
```

### API
#### `v8FlagsFilter(path, [options])`
 - `path` - path to CLI script.
 - `options` - an optional object with the following optional keys:
   - `ignore` - an array of v8 flags to ignore, i.e. to _not_ filter-out when spawning a new process.
   - `forcedKillDelay` - a number of milliseconds after which to send a kill command to the spawned process, only after an interrupt has already been issued.  Defaults to `30000`.
   - `useShutdownMessage` - rather than forwarding along interrupt signals to the spawned process, instead forwards a `'shutdown'` message to the spawned process.

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
