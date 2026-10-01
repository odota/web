# promisify-event
[![Build Status](https://api.travis-ci.org/inikulin/promisify-event.svg)](https://travis-ci.org/inikulin/promisify-event)

*Promisify EventEmitter's event.*

## Install
```
npm install promisify-event
```

## Usage
```js
const promisifyEvent = require('promisify-event');

// Promisify server's `listening` event:
promisify(server, `listening`).then(() => {
  // ...
});

// Promisify `error` event. `error` event always rejects the promise:
promisify(server, 'error').catch(() => {
  // ...
});

// Cancel event subscription and promise (it will be never fulfilled):
var listeningPromise = promisify(server, `listening`);

listeningPromise.cancel();

listeningPromise.then(() => {
  // Will never happen
});

```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
