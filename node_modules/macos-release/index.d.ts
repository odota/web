/**
Get the name and version of a macOS release from the Darwin version.

@param release - By default, the current operating system is used, but you can supply a custom [Darwin kernel version](https://en.wikipedia.org/wiki/Darwin_%28operating_system%29#Release_history), which is the output of [`os.release()`](https://nodejs.org/api/os.html#os_os_release).

@example
```
import os from 'node:os';
import macosRelease from 'macos-release';

// On a macOS Sierra system

macosRelease();
//=> {name: 'Sierra', version: '10.12'}

os.release();
//=> 13.2.0
// This is the Darwin kernel version

macosRelease(os.release());
//=> {name: 'Sierra', version: '10.12'}

macosRelease('14.0.0');
//=> {name: 'Yosemite', version: '10.10'}

macosRelease('20.0.0');
//=> {name: 'Big Sur', version: '11'}
```
*/
export default function macosRelease(): {name: string; version: string};
export default function macosRelease(release: string): {name: string; version: string} | undefined;
