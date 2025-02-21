// Headers is a partial polyfill for the HTML5 Headers class.
export class Headers {
  constructor(h = {}) {
    this.h = {};
    if (h instanceof Headers) {
      h.forEach((value, key) => this.append(key, value));
    }
    Object.getOwnPropertyNames(h)
        .forEach(key => this.append(key, h[key]));
  }
  append(key, value) {
    key = key.toLowerCase();
    if (!Array.isArray(this.h[key])) {
      this.h[key] = [];
    }
    this.h[key].push(value);
  }
  set(key, value) {
    this.h[key.toLowerCase()] = [ value ];
  }
  has(key) {
    return Array.isArray(this.h[key.toLowerCase()]);
  }
  get(key) {
    key = key.toLowerCase();
    if (Array.isArray(this.h[key])) {
      return this.h[key][0];
    }
  }
  getAll(key) {
    return this.h[key.toLowerCase()].concat();
  }
  entries() {
    const items = [];
    this.forEach((value, key) => { items.push([key, value]) });
    return makeIterator(items);
  }

  // forEach is not part of the official spec.
  forEach(callback, thisArg) {
    Object.getOwnPropertyNames(this.h)
        .forEach(key => {
          this.h[key].forEach(value => callback.call(thisArg, value, key, this));
        }, this);
  }
}

function makeIterator(items) {
  return {
    next() {
      const value = items.shift();
      return {
        done: value === undefined,
        value: value
      }
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}