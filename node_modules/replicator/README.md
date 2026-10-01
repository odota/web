<p align="center">
    <a href="https://github.com/inikulin/replicator">
        <img src="https://raw.github.com/inikulin/replicator/master/media/logo.png" alt="replicator" />
    </a>
</p>
<p align="center">
<i>Advanced JavaScript objects serialization</i>
</p>
<p align="center">
  <a href="https://github.com/inikulin/replicator/commits/master"><img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/inikulin/replicator/master?label=tests"></a>
  <a href="https://www.npmjs.com/package/replicator"><img alt="NPM Version" src="https://img.shields.io/npm/v/replicator.svg"></a>
</p>

- Can serialize circular references
- In addition to JSON-serializable types can serialize:
  - `undefined`
  - `NaN`
  - `Date`
  - `RegExp`
  - `Error`<sup>[1](#note1)</sup>
  - `Map`<sup>[2](#note2)</sup>
  - `Set`<sup>[3](#note3)</sup>
  - `ArrayBuffer`<sup>[3](#note3)</sup>
  - Typed arrays<sup>[3](#note3)</sup>
- [Can be extended with custom type transforms](#adding-custom-types-support)
- [Can use any target serializer under the hood](#changing-serialization-format) (JSON, BSON, protobuf, etc.)

----
<a name="note1">1</a>: If decoding target platform doesn't support encoded error type, it will fallback to `Error` constructor.<br>
<a name="note2">2</a>: If decoding target platform doesn't support `Map`, it will be decoded as array of `[key, value]`.<br>
<a name="note3">3</a>: If decoding target platform doesn't support `Set`, `ArrayBuffer` or typed arrays, they will be decoded as array. <br>

## Install
```shell
npm install replicator
```

## Usage
```js
const Replicator = require('replicator');

const replicator = new Replicator();

const a = {};
a.b = a;

const str = replicator.encode({
    key1: new Set([1, 2, 3]),
    key2: /\s+/ig,
    key3: a
});

const obj = replicator.decode(str);
```


## Adding custom types support
You can extend `replicator` with custom type transform which will describe how to serialize/deserialize objects. You can
add transforms using `.addTransforms(transforms)` method. And remove them using `.removeTransforms(transforms)` method.
Both methods are chainable and accept single transform or array of transforms. You should add transforms to both encoding
and decoding instances of `replicator`.

Let's create transform which will encode `NodeList` of elements and decode it as array of objects with `tagName` property:
```js
const Replicator = require('replicator');

const replicator = new Replicator();

replicator.addTransforms([
    {
        type: 'NodeList',

        shouldTransform (type, val) {
            return typeof NodeList === 'function' && val instanceof NodeList;
        },

        toSerializable (nodeList) {
            // We should transform NodeList to primitive serializable object.
            // It's an array of HTMLElement in our case.
            // Note that it's not required to transform each element in
            // NodeList. We can add HTMLElement transform which
            // will transform NodeList items and individual elements as well.
            return Array.prototype.slice.call(nodeList);
        },

        fromSerializable (val){
            // Now we should describe how to restore NodeList from serializable object.
            // In our case we just need an array so we'll return it as is.
            // If you want to restore it as NodeList you can create document fragment, append
            // array contents to it and return result of `fragment.querySelectorAll('*')` .
            return val;
        }
    },

    {
        type: 'Element',

        shouldTransform (type, val){
            return typeof HTMLElement === 'function' && val instanceof HTMLElement;
        },

        toSerializable (element) {
            return element.tagName;
        },

        fromSerializable (val) {
            return { tagName: val };
        }
    }
]);

var str = replicator.encode(document.querySelectorAll('div'));

console.log(replicator.decode(str));
// > [ { tagName: 'div'}, { tagName: 'div'}, { tagName: 'div'}]
```

Built-in types support implemented using transforms, so you can take a look on `replicator` source code for more examples.

## Changing serialization format
By default `replicator` uses JSON under the hood. But you can use any serializer by passing serializer adapter to `Replicator`
constructor. E.g., let's use [BSON](https://www.npmjs.com/package/bson) as serializer:
```js
const Replicator = require('replicator');
const BSON       = require('bson');

const replicator = new Replicator({
    serialize (val) {
        return BSON.serialize(val, false, true, false);
    },

    deserialize: BSON.deserialize
});

replicator.encode(['yo', 42]);
// > <Buffer>
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
