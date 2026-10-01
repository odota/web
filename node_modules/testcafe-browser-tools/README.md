# testcafe-browser-tools

[![Build Status](https://travis-ci.org/DevExpress/testcafe-browser-tools.svg)](https://travis-ci.org/DevExpress/testcafe-browser-tools)

TestСafe Browser Tools is an utility library for performing platform-dependent actions on browser windows.
Working with browsers is specific for each operating system and requires native code to deal with. In order to provide painless and simple installation, this package encapsulates pre-built binaries for all supported platforms and JS-wrappers around them. This helps end-users avoid running *post-npm-install* build actions.
 
# Build Process
To build native binaries from source files, execute the gulp task corresponding to your operating system:
```
'buildWin'
'buildMac'
'buildLinux'
```
**Important note**: The application for a particular platform must be built on a machine with the same platform. Since this package can be used on old OS version such as NodeJS 16 docker container, it is important to build binaries on the old OS version for the binaries to contain corresponding dependencies(for example glibc-2.31 for node16 docker image).

The *bin* directory contains pre-built native binaries. Consider using them if your contribution does not affect the native modules.

# Install

```
$ npm install testcafe-browser-tools
```
# API Reference

**Important note**: To identify the web browser window, most of the provided functions use its title.
This title matches the web page's `document.title` in most of the browsers.
However, Microsoft Edge truncates the window title to the hostname if `document.title` contains only a URL
( e.g. `document.title = 'http://localhost:1337/page'` gives `localhost` in the window title).

So, you need to add some characters before the URL in order to bring it to the window title:
```js
document.title = 'title: ' + document.location.toString()
```
For API reference, see the [API](API.md) document.

# Testing

To run automated tests:
```
$ npm test
```
Since the module functionality depends on browsers available on a testing machine and you cannot predict expected returned values for some functions, the automated tests cover only a part of the functionality.
To test all the functions provided by the module, use the playground. To run it, execute the gulp task corresponding to your operating system:
```
$ gulp runPlaygroundWin
$ gulp runPlaygroundMac
$ gulp runPlaygroundLinux
```
This will open the Playground web page at [http://localhost:1334/](http://localhost:1334/), where you can manually check if the functions work correctly.

# Author

Developer Express Inc.([http://devexpress.com](http://devexpress.com))
