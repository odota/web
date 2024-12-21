# fetch-readablestream
Compatibility layer for efficient streaming of binary data using [WHATWG Streams](https://streams.spec.whatwg.org/)

## Why
This library provides a consistent, cross browser API for streaming a response from an HTTP server based on the [WHATWG Streams specification](https://streams.spec.whatwg.org/).  At the time of writing, Chrome is the only browser to nativley support returning a `ReadableStream` from it's `fetch` implementation - all other browsers need to fall back to `XMLHttpRequest`.

FireFox does provide the ability to efficiently retrieve a byte-stream from a server; however only via it's `XMLHttpRequest` implementation (when using `responsetype=moz-chunked-arraybuffer`).  Other browsers do not provide access to the underlying byte-stream and must therefore fall-back to concatenating the response string and then encoding it into it's UTF-8 byte representation using the [`TextEncoder` API](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder).

*Nb:* If you are happy using a node-style API (using callbacks and events) I would suggest taking a look at [`stream-http`](https://github.com/jhiesey/stream-http).

## Installation
This package can be installed with `npm`:

```
$ npm install fetch-readablestream --save
```

Once installed you can import it directly:

```js
import fetchStream from 'fetch-readablestream';
```

Or you can add a script tag pointing to the `dist/fetch-readablestream.js` bundle and use the `fetchStream` global:

```html
<script src="./node_modules/fetch-readablestream/dist/fetch-readablestream.js"></script>
<script>
  window.fetchStream('...')
</script>
```

## Usage
The `fetchStream` api provides a subset of the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch); in particular, the ability to get a `ReadableStream` back from the `Response` object which can be used to efficiently stream a chunked-transfer encoded response from the server.

```js
function readAllChunks(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];

  function pump() {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return chunks;
      }
      chunks.push(value);
      return pump();
    });
  }

  return pump();
}

fetchStream('/endpoint')
  .then(response => readAllChunks(response.body))
  .then(chunks => console.dir(chunks))
```

`AbortController` is supported [in many environments](https://caniuse.com/#feat=abortcontroller), and allows you to abort ongoing requests. This is fully supported in any environment that supports both ReadableStreams & AbortController directly (e.g. Chrome 66+), and has basic support in most other environments, though you may need [a polyfill](https://www.npmjs.com/package/abortcontroller-polyfill) in your own code to use it. To abort a request:

```js
const controller = new AbortController();

fetchStream('/endpoint', {
  signal: controller.signal
}).then(() => {
  // ...
});

// To abort the ongoing request:
controller.abort();
```

## Browser Compatibility
`fetch-readablestream` makes the following assumptions on the environment; legacy browsers will need to provide Polyfills for this functionality:

| Feature                        | Browsers                         | Polyfill |
|--------------------------------|----------------------------------|----------|
| ReadableStream                 | Firefox, Safari, IE11, PhantomJS | [web-streams-polyfill](https://www.npmjs.com/package/web-streams-polyfill) |
| TextEncoder                    | Safari, IE11, PhantomJS          | [text-encoding](https://www.npmjs.com/package/text-encoding) |
| Promise, Symbol, Object.assign | IE11, PhantomJS                  | [babel-polyfill](https://www.npmjs.com/package/babel-polyfill) |

## Contributing
Use `npm run watch` to fire up karma with live-reloading.  Visit http://localhost:9876/ in a bunch of browsers to capture them - the test suite will run automatically and report any failures.


