/**
Check if the process is running inside a Podman container.

@example
```
import isPodman = require('is-podman)

if (isPodman()) {
	console.log('Running inside a Podman container')
}
```
*/
declare function isPodman(): boolean;

export = isPodman;
