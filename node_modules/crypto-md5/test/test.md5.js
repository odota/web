(function () {
  'use strict';

  var md5 = require('../md5');

  describe('md5', function () {
    it('returns a base64 md5 hash of a string', function () {
      md5('foobar').should.equal('OFj2IjCsPJFfMAxmQxLGPw==');
    });
    it('returns a base64 md5 hash of a buffer', function () {
      md5(new Buffer('foobar')).should.equal('OFj2IjCsPJFfMAxmQxLGPw==');
    });
    it('returns an hex md5 hash of a string', function () {
      md5('foobar', 'hex').should.equal('3858f62230ac3c915f300c664312c63f');
    });
    it('returns an hex md5 hash of a buffer', function () {
      md5(new Buffer('foobar'), 'hex').should.equal('3858f62230ac3c915f300c664312c63f');
    });
  });

})();