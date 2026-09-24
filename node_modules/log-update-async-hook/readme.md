# log-update-async-hook [![Build Status](https://travis-ci.org/AndreyBelym/log-update-async-hook.svg?branch=master)](https://travis-ci.org/AndreyBelym/log-update-async-hook)

This is a fork of the [log-update](https://github.com/sindresorhus/log-update) by Sindre Sorhus, that uses `async-exit-hook` to restore terminal cursor state when the process terminates.
Usage of `exit-hook` or `signal-exit` hook in the original `log-update` prevents execution of asynchronous operations on signals (`SIGTERM`, `SIGHUP`, etc.) in the code of the main application.
So I've replaced them by `async-exit-hook`, rewritten code to allow execution on Node versions below `4.x` and bundled some dependencies into the package.
  
> Log by overwriting the previous output in the terminal.<br>
> Useful for rendering progress bars, animations, etc.

![](screenshot.gif)


## Install

```
$ npm install --save log-update
```


## Usage

```js
const logUpdate = require('log-update');
const frames = ['-', '\\', '|', '/'];
let i = 0;

setInterval(() => {
	const frame = frames[i = ++i % frames.length];

	logUpdate(
`
        ♥♥
   ${frame} unicorns ${frame}
        ♥♥
`
	);
}, 80);
```


## API

### logUpdate(text, ...)

Log to stdout.

### logUpdate.clear()

Clear the logged output.

### logUpdate.done()

Persist the logged output.<br>
Useful if you want to start a new log session below the current one.

### logUpdate.stderr(text, ...)

Log to stderr.

### logUpdate.stderr.clear()
### logUpdate.stderr.done()

### logUpdate.create(stream)

Get a `logUpdate` method that logs to the specified stream.


## Examples

- [listr](https://github.com/SamVerschueren/listr) - Uses this module to render an interactive task list
- [ora](https://github.com/sindresorhus/ora) - Uses this module to render awesome spinners
- [speed-test](https://github.com/sindresorhus/speed-test) - Uses this module to render a [spinner](https://github.com/sindresorhus/elegant-spinner)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
