# React String Replace

[![Build Status](https://img.shields.io/circleci/project/iansinnott/react-string-replace.svg)](https://circleci.com/gh/iansinnott/react-string-replace)
[![react-string-replace.js on NPM](https://img.shields.io/npm/v/react-string-replace.svg)](https://www.npmjs.com/package/react-string-replace)

A simple way to safely do string replacement with React components

> Aka turn a string into an array of React components

## Install

```
$ npm install --save react-string-replace
```


## Usage

### Simple Example

```js
const reactStringReplace = require('react-string-replace')
reactStringReplace('whats your name', 'your', (match, i) => (
  <span>{match}</span>
));
// => [ 'whats ', <span>your</span>, ' name' ]
```

### More realistic example

Highlight all digits within a string by surrounding them in span tags:

```js
reactStringReplace('Apt 111, phone number 5555555555.', /(\d+)/g, (match, i) => (
  <span key={i} style={{ color: 'red' }}>{match}</span>
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

```js
const reactStringReplace = require('react-string-replace');

const HighlightNumbers = React.createClass({
  render() {
    const content = 'Hey my number is 555-555-5555.';
    return (
      <div>
        {reactStringReplace(content, /(\d+)/g, (match, i) => (
          <span key={i} style={{ color: 'red' }}>{match}</span>
        ))}
      </div>
    );
  },
});
```

### Multiple replacements on a single string

You can run multiple replacements on one string by calling the function multiple times on the returned result. For instance, if we want to match URLs, @-mentions and hashtags in a string we could do the following:

```js
const reactStringReplace = require('react-string-replace')

const text = 'Hey @ian_sinn, check out this link https://github.com/iansinnott/ Hope to see you at #reactconf';
let replacedText;

// Match URLs
replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
  <a key={match + i} href={match}>{match}</a>
));

// Match @-mentions
replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
  <a key={match + i} href={`https://twitter.com/${match}`}>@{match}</a>
));

// Match hashtags
replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
  <a key={match + i} href={`https://twitter.com/hashtag/${match}`}>#{match}</a>
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

I wanted an easy way to do string replacement a la `String.prototype.replace` within React components **without** breaking React's built in string escaping functionality. This meant standard string replacement combined with `dangerouslySetInnerHTML` was out of the question.

## API

### reactStringReplace(string, match, func)

#### string

Type: `string|array`

The string or array you would like to do replacement on.

**NOTE:** When passed an array this is the same as running the replacement on every string within the array. Any non-string values in the array will be left untouched.

#### match

Type: `regexp|string`

The string or RegExp you would like to replace within `string`. Note that when using a `RegExp` you **MUST** include a matching group.

Example: Replace all occurrences of `'hey'` with `<span>hey</span>`

```js
reactStringReplace('hey hey you', /(hey)/g, () => <span>hey</span>);
```

#### func

Type: `function`

The replacer function to run each time `match` is found. This function will be passed the matching string and an `index` which can be used for adding keys to replacement components if necessary. Character `offset` identifies the position of match start in the provided text.

```js
const func = (match, index, offset) => <span key={index}>{match}</span>;
reactStringReplace('hey hey you', /(hey)/g, func);
```

## License

MIT © [Ian Sinnott](https://github.com/iansinnott)
