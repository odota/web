# endpoint-utils
[![Build Status](https://api.travis-ci.org/inikulin/endpoint-utils.svg)](https://travis-ci.org/inikulin/endpoint-utils)

*Utils to deal with TCP ports and hostnames. Safe for everyday use.*

## Install
```
npm install endpoint-utils
```

## Usage
### Get free port
```js
const getFreePort = require('endpoint-utils').getFreePort;

getFreePort().then(port => {
    console.log(port);
    //> 1337
});
```

### Get multiple free ports
```js
const getFreePorts = require('endpoint-utils').getFreePorts;

getFreePorts(3).then(ports => {
    console.log(ports);
    //> [1337, 1338, 1339]
});
```

### Check if port is free
```js
const isFreePort = require('endpoint-utils').isFreePort;

isFreePort(1337).then(isFree => {
    console.log(isFree);
    //> true
});
```

### Check if hostname or IP address resolves to the current machine
```js
const isMyHostname = require('endpoint-utils').isMyHostname;

isMyHostname('inikulin').then(isMy => {
    console.log(isMy);
    //> true
});

isMyHostname('172.22.5.80').then(isMy => {
    console.log(isMy);
    //> true
});
```

### Get hostname or IP address which can be resolved to the current machine
```js
const getMyHostname = require('endpoint-utils').getMyHostname;

getMyHostname().then(hostname => {
    console.log(hostname);
    //> "inikulin.local"
});
```

### Get IP address of current machine
```js
const getIPAddress = require('endpoint-utils').getIPAddress;

console.log(getIPAddress());
//> "172.22.5.80"
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
