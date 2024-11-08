#!/bin/bash

# Patch up ES6 module entry point so it's more pleasant to use.
echo 'module.exports = require("./index").default;' > ./lib/entry.js

mkdir -p dist
./node_modules/.bin/browserify -s fetchStream -e ./lib/entry.js -o dist/fetch-readablestream.js