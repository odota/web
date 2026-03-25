[![NPM version](https://badge.fury.io/js/crypto-md5.svg)](http://badge.fury.io/js/crypto-md5)

# crypto-md5

There are several md5 modules on npm, but none of them use the `crypto` node module.
Researching the performance impact of one vs another is tedious, and I just wanted to
use the core one without having to duplicate code all the time so I just implemented
this function as a separate module.

## Usage

    npm install --save crypto-md5

## API

### md5(data, digest)

  Returns a base64 md5 hash of the buffer or string. Can return an hex digest.

* `data`: buffer or string to hash
* `digest`: optional digest type. Can be `base64` (default) or `hex`

```js
var md5 = require('md5');

md5('foobar');

// OFj2IjCsPJFfMAxmQxLGPw==

md5('foobar', 'hex');

// 3858f62230ac3c915f300c664312c63f
```

## Contributions

Please open issues for bugs and suggestions in [github](https://github.com/jtblin/crypto-md5/issues).
Pull requests with tests are welcome.

## Author

Jerome Touffe-Blin, [@jtblin](https://twitter.com/jtlbin), [About me](http://about.me/jtblin)

## License

crypto-md5 is copyright 2015 Jerome Touffe-Blin and contributors. It is licensed under the BSD license.
See the include LICENSE file for details.
