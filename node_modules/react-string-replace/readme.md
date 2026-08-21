# React String Replace

[![react-string-replace.js on NPM](https://img.shields.io/npm/v/react-string-replace.svg)](https://www.npmjs.com/package/react-string-replace)

A simple way to safely do string replacement with React components. Zero dependencies.

> Aka turn a string into an array of React components

## Install

```sh
npm install react-string-replace
# or
yarn add react-string-replace
# or
bun add react-string-replace
```

## Usage

First, import the lib. Both `require` and `import` are supported.

```js
import reactStringReplace from "react-string-replace";
// OR
const reactStringReplace = require("react-string-replace");
```

Examples will use `import` since it is more common in the React ecosystem.

### Simple Example

```js
import reactStringReplace from 'react-string-replace';

reactStringReplace('whats your name', 'your', (match, i) => (
  <span>{match}</span>
));
// => [ 'whats ', <span>your</span>, ' name' ]
```

### More realistic example

Highlight all digits within a string by surrounding them in span tags:

```js
reactStringReplace("Apt 111, phone number 5555555555.", /(\d+)/g, (match, i) => (
  <span key={i} style={{ color: "red" }}>
    {match}
  </span>
));
// =>
// [
//   'Apt ',
//   <span style={{ color: 'red' }}>111</span>,
//   ', phone number ',
//   <span style={{ color: 'red' }}>5555555555</span>,
//   '.'
// ]
```

### Within a React component

```jsx
import reactStringReplace from "react-string-replace";

function HighlightNumbers() {
  const content = "Hey my number is 555-555-5555.";
  return (
    <div>
      {reactStringReplace(content, /(\d+)/g, (match, i) => (
        <span key={i} style={{ color: "red" }}>
          {match}
        </span>
      ))}
    </div>
  );
}
```

### Multiple replacements on a single string

You can run multiple replacements on one string by calling the function multiple times on the returned result. For instance, if we want to match URLs, @-mentions and hashtags in a string we could do the following:

```js
import reactStringReplace from "react-string-replace";

const text =
  "Hey @ian_sinn, check out this link https://github.com/iansinnott/ Hope to see you at #reactconf";
let replacedText;

// Match URLs
replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
  <a key={match + i} href={match}>
    {match}
  </a>
));

// Match @-mentions
replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
  <a key={match + i} href={`https://twitter.com/${match}`}>
    @{match}
  </a>
));

// Match hashtags
replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
  <a key={match + i} href={`https://twitter.com/hashtag/${match}`}>
    #{match}
  </a>
));

// => [
//   'Hey ',
//   <a href='https://twitter.com/ian_sinn'>@ian_sinn</a>
//   ', check out this link ',
//   <a href='https://github.com/iansinnott/'>https://github.com/iansinnott/</a>,
//   '. Hope to see you at ',
//   <a href='https://twitter.com/hashtag/reactconf'>#reactconf</a>,
//   '',
// ];
```

### Full Example

See the [`example/`](https://github.com/iansinnott/react-string-replace/tree/master/example) directory for a runnable example.

## Why?

I wanted an easy way to do string replacement similar to `String.prototype.replace` within React components **without** breaking React's built in string escaping and XSS protection. This meant standard string replacement combined with `dangerouslySetInnerHTML` was out of the question.

## API

### reactStringReplace(string, match, replacementFunction, count)

#### string

Type: `string|array`

The string or array you would like to do replacement on.

**NOTE:** When passed an array this is the same as running the replacement on every string within the array. Any non-string values in the array will be left untouched.

#### match

Type: `regexp|string`

The string or RegExp you would like to replace within `string`.

**NOTE:** When using a `RegExp` you **MUST** include a capturing group. (`/(hey)/g` is ok, `/hey/g` is not.)

Example: Replace all occurrences of `'hey'` with `<span>hey</span>`

```js
reactStringReplace("hey hey you", /(hey)/g, () => <span>hey</span>);
```

#### replacementFunction

Type: `function`

The replacer function to run each time `match` is found. This function will be passed the matching string and an `index` which can be used for adding keys to replacement components if necessary. Character `offset` identifies the position of match start in the provided text.

```js
const replacementFunction = (match, index, offset) => <span key={index}>{match}</span>;
reactStringReplace("hey hey you", /(hey)/g, replacementFunction);
```

#### count

Type: `number`

The number of substitutions to perform - for example if `count` is 1, then only the first occurrence of the string will be replaced.

Example: Replace first occurrence of `'hey'` with `<span>hey</span>`

```js
reactStringReplace("hey hey you", "hey", () => <span>hey</span>, 1);
```

## API Stability

The API is stable and production ready.

**v2.0.0 Breaking Change:** The `index` parameter passed to the replacement function now starts at 0 and increments by 1 (previously it started at 1 and incremented by 2).

For details on API tests see [the tests file](./index.test.js).

## License

MIT © [Ian Sinnott](https://github.com/iansinnott)
