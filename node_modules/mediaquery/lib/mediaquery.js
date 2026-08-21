var MQ = {

  asArray: function asArray(obj) {
    var bp = this.getBreakPoints(obj);
    var custom = this.getCustomQueries(obj);

    return this._translate(this._makeSteps(this._toSortedArray(bp)))
      .concat(this._objToArr(custom));
  },

  asObject: function asObject(obj) {
    return this._arrToObj(this.asArray(obj));
  },

  getBreakPoints: function getBreakPoints(obj) {
    return Object.keys(obj).reduce(function (prev, next) {
      if (typeof obj[next] === 'number') {
        prev[next] = obj[next];
      }
      return prev;
    }, {});
  },

  getCustomQueries: function getCustomQueries(obj) {
    return Object.keys(obj).reduce(function (prev, next) {
      if (typeof obj[next] === 'string') {
        prev[next] = obj[next];
      }
      return prev;
    }, {});
  },

  _toSortedArray: function _toSortedArray(obj) {
    return Object.keys(obj).map(function (el) {
      return [el, obj[el]];
    }).sort(function (a, b) {
      return a[1] - b[1];
    });
  },

  _makeSteps: function _makeSteps(arr) {
    return (arr[arr.length - 1][1] === Infinity)?
      arr
      : arr.concat([Infinity]);
  },

  _translate: function _translate(arr) {
    return arr.map(function (el, index) {
      return (index === 0)?
        [el[0], 'screen and (max-width: ' + el[1] + 'px)']
        : (index === arr.length - 1)?
          [(el[0] || 'default'), 'screen and (min-width: ' +
            (arr[index - 1][1] + 1) + 'px)']
          : [el[0], 'screen and (min-width: ' + (arr[index-1][1] + 1) +
            'px) and (max-width: ' + el[1] + 'px)'];
    });
  },

  _objToArr: function _objToArr(obj) {
    return Object.keys(obj).map(function (el) {
      return [el, obj[el]];
    });
  },

  _arrToObj: function _arrToObj(arr) {
    return arr.reduce(function (prev, next) {
      prev[next[0]] = next[1];
      return prev;
    }, {});
  }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = MQ;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return MQ;
    });
  }
  else {
    window.MQ = MQ;
  }
}
