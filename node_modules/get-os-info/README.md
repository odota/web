# get-os-info

> Get the name and version of the local OS

> This package is based on the [macos-release](https://www.npmjs.com/package/macos-release)
> , [windows-release](https://www.npmjs.com/package/windows-release) and [getos](https://www.npmjs.com/package/getos)
> packages.

## Install

```
$ npm install get-os-info
```

## Usage

### TypeScript

```ts
import getOSInfo, { OSInfo } from 'get-os-info'

const info: OSInfo | null = await getOSInfo();

if (info)
    console.log(info.name, info.version)

// Example:
// {
//   name: 'Windows',
//   version: '11'
// }

```

### JavaScript

```js
import { getOSInfo } from 'get-os-info';
//or
const { getOSInfo } = require('get-os-info');

const info = await getOSInfo();
```

### Separate functions

```js
import os from 'os'
import { getMacInfo, getWindowsInfo, getLinuxInfo } from "get-os-info";
//or
const os = require("os");
const { getMacInfo, getWindowsInfo, getLinuxInfo } = require('get-os-info')

const release = os.release(); //'10.0.22000'

getWindowsInfo(release).then(info => {
    if (info)
        console.log(info);
})
// {
//   name:    'Windows',
//   version: '11'
// }

console.log(await getWindowsInfo()) // Will be the same
```

> NOTE: Currently it is not possible to pass a release version argument to the getLinuxInfo function.

## Related

- [windows-release](https://github.com/sindresorhus/windows-release)
- [macos-release](https://github.com/sindresorhus/macos-release)
- [getos](https://github.com/retrohacker/getos)

---
