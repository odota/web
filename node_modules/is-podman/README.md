# is-podman 

`is-podman` is an NPM module that checks whether a process is running inside a Podman container. This module is intended to work similarly to sindresorhus' `is-docker [module](https://www.npmjs.com/package/is-docker).

## Install

```
$ npm install is-podman
```

## Code Usage

```js
import isPodman = require('is-podman')

if (isPodman()) {
	console.log('Running inside a Podman container')
}
```

## CLI Usage
```
$ is-podman
```
Exits with code 0 if inside a Podman container and 2 if not.

## Testing

Both the code and CLI functionality were tested on WSL in the following environemtnts:
1. no containerization
1. Docker
1. Podman

Behavior was as expected, but no formal tests have been written yet.