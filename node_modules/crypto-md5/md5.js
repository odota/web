(function () {
  'use strict';

  var crypto = require('crypto');

  module.exports = function (data, digest) {
    return crypto.createHash('md5').update(data).digest(digest || 'base64');
  };

})();