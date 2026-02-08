# callsite-record
[![Build Status](https://api.travis-ci.org/inikulin/callsite-record.svg)](https://travis-ci.org/inikulin/callsite-record)

*Create fancy log entries for errors and function call sites.*

**For Error:**
```js
'use strict';

const createCallsiteRecord = require('callsite-record');

function myFunc() {
    throw new Error('Yo!');
}

try {
    myFunc();
}
catch(err) {
    console.log(createCallsiteRecord({ forError: err }).renderSync());
}

```

 ⬇

![example](https://raw.githubusercontent.com/inikulin/callsite-record/master/media/example1.png)



**For function call up in the stack:**

```js
'use strict';

const createCallsiteRecord = require('callsite-record');

function func2 () {
    (function func1 () {
        console.log(createCallsiteRecord({ byFunctionName: 'func2' }).renderSync());
    })();
}

func2();
```

 ⬇

![example](https://raw.githubusercontent.com/inikulin/callsite-record/master/media/example2.png)

**Additional goodies:**
- Use [renderers](#renderoptionsrenderer) for different output formats, e.g. to produce output in HTML.
- Use [stack filter](#renderoptionsstackfilter) to produce clean and beautiful stacks, e.g. removing Node lib internal calls.

## Install
```
npm install callsite-record
```

## API
### createCallsiteRecord( { forError, isCallsiteFrame, processFrameFn }) → CallsiteRecord

You can generate a callsite for any stack frame, not only the topmost one. Use the `isCallsiteFrame` function to select
a frame. This function is called for each frame starting from the top. Return `true` for the desired frame to generate
the callsite.

*Example:*
```js
const createCallsiteRecord = require('callsite-record');

try {
    throw new Error("We're doomed");
}
catch(err) {
    const record = createCallsiteRecord({ forError: err });
}
```

### createCallsiteRecord({ byFunctionName, typeName, processFrameFn }) → CallsiteRecord

Creates `CallsiteRecord` for the function up in the call stack specified by `byFunctionName`. You can optionally specify a
`typeName` if the function is a method. If the function is a constructor set `byFunctionName` to `constructor`.

*Example:*
```js
const createCallsiteRecord = require('callsite-record');

(function func1() {
    (function func2() {
        (function func3() {
            const record = createCallsiteRecord({ byFunctionName: 'func2' });
        })();
    })();
})();
```

You can specify `processFrameFn` function, which will process every frame in callstack. It's usefull when you need to 
enable frame processing like `source-maps-support`.

*Example:*
```js
const createCallsiteRecord = require('callsite-record');
const wrapCallSite         = require('source-map-support').wrapCallSite;

try {
    throw new Error("We're doomed");
}
catch(err) {
    const record = createCallsiteRecord({ forError: err, processFrameFn: wrapCallSite });
}

(function func1() {
    (function func2() {
        (function func3() {
            const record = createCallsiteRecord({ byFunctionName: 'func2', processFrameFn: wrapCallSite });
        })();
    })();
})();
```

### CallsiteRecord
#### CallsiteRecord.render([renderOptions]) → Promise&lt;String&gt;
Renders call site record to the string.

*Example:*
```js
record.render().then(str => console.log(str));
```

#### CallsiteRecord.renderSync([renderOptions]) → String
Sync version of the `CallsiteRecord.render`.

##### renderOptions.frameSize
Specifies the number of lines rendered above and below the call site in the code frame. **Default:** `5`.

*Example:*
```js
console.log(record.renderSync({ frameSize: 0 }));
// > 12 |    func1();
// ...

console.log(record.renderSync({ frameSize: 1 }));
//   11 |(function func2() {
// > 12 |    func1();
//   13 |})();
// ...
```

##### renderOptions.codeFrame
Specifies if code frame should be rendered. If disabled only stack will be rendered. **Default:** `true`.

##### renderOptions.stack
Specifies if stack trace should be rendered in addition to the code frame. **Default:** `true`.

##### renderOptions.stackFilter
Function that will be used to filter stack frames. Function accepts 2 arguments:
 - `stackFrame` - stack entry.
 - `idx` - index of the frame.
 - `isV8StackFrame` - if `true` then `stackFrame` is a V8 [CallSite](https://github.com/v8/v8/wiki/Stack-Trace-API#customizing-stack-traces) object.
 Otherwise it's a [StackFrame](https://github.com/stacktracejs/stackframe) object.

**Default:** `null`.

*Example:*
```js
const sep = require('path').sep;

// Remove node core lib calls from the stack trace
record.renderSync({ stackFilter: frame => frame.getFileName().indexOf(sep) > -1 });
```

##### renderOptions.renderer
Specifies the output format of the rendering. **Default:** `renderers.default`. You can pass your own
renderer object ([example implementations](https://github.com/inikulin/callsite-record/tree/master/lib/renderers)) or use
one of the built-in renderers:

###### renderers.default
Provides ANSI-colored output as shown above.

*Usage:*
```js
const defaultRenderer = require('callsite-record').renderers.default;

record.renderSync({ renderer: defaultRenderer });
```

###### renderers.noColor
Same as `default` renderer but without colors.

*Usage:*
```js
const noColorRenderer = require('callsite-record').renderers.noColor;

record.renderSync({ renderer: noColorRenderer });
```

###### renderers.html
Outputs HTML that can be later decorated with the CSS and embeded into the web page. [Example output](https://github.com/inikulin/callsite-record/blob/master/test/data/expected-html/0.html).

*Usage:*
```js
const htmlRenderer = require('callsite-record').renderers.html;

record.renderSync({ renderer: html });
```


## Related
 * [is-es2016-keyword](https://github.com/inikulin/is-es2016-keyword) - Determine if string is an ES2016 keyword.
 * [highlight-es](https://github.com/inikulin/highlight-es) - Highlight ECMAScript syntax for the console or any other medium.

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
