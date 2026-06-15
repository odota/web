var expect = require('chai').expect;

var MQ = require('../lib/mediaquery');

describe('mediaquery', function () {
  it('should be an object', function () {
    expect(MQ).to.exist
      .and.to.be.an('object');
  });

  it('should be available as a node module', function () {
    nodeMQ = require('../index');
    expect(MQ).to.exist
      .and.to.be.an('object');
  });

  describe('mediaquery.getBreakPoints', function () {
    it('should be a function', function () {
      expect(MQ.getBreakPoints).to.exist
        .and.to.be.a('function');
    });

    it('should filter out non numerical properties', function () {
      var input = {
        small: 300,
        testFun: function () {},
        medium: 600,
        testObj: {},
        tablet: 'tablet media query',
        testArr: [],
        big: 1024,
        huge: Infinity
      };

      expect(MQ.getBreakPoints(input))
        .to.have.all.keys(['small', 'medium', 'big', 'huge']);
    });
  });

  describe('mediaquery.getCustomQueries', function () {
    it('should be a function', function () {
      expect(MQ.getCustomQueries).to.exist
        .and.to.be.a('function');
    });

    it('should only include string properties', function () {
      var input = {
        small: 300,
        testFun: function () {},
        medium: 600,
        string: 'a string',
        testObj: {},
        tablet: 'tablet media query',
        testArr: [],
        big: 1024,
        huge: Infinity
      };

      expect(MQ.getCustomQueries(input))
        .to.have.all.keys(['string', 'tablet']);
    });
  });

  describe('mediaquery._toSortedArray', function () {
    var input = {
      medium: 600,
      big: 1024,
      small: 300
    };

    it('should be a function', function () {
      expect(MQ._toSortedArray).to.exist
        .and.to.be.a('function');
    });

    it('should return an array', function () {
      expect(MQ._toSortedArray(input)).to.be.an('array');
    });

    it('should return an array of couples [key, val]', function () {
      expect(MQ._toSortedArray(input)).to.satisfy(function (arr) {
        return arr.reduce(function (prev, next) {
          return prev && next.length === 2;
        }, true);
      });
    });

    it('should convert an object to an array in the form [[key1, val1], [key2, val2]]', function () {
      expect(MQ._toSortedArray(input)[0][0]).to.be.a('string');
      expect(MQ._toSortedArray(input)[0][1]).to.be.a('number');
    });

    it('should return an array ordered by the object property values', function () {
      expect(MQ._toSortedArray(input)).to.be.eql([
        ['small', 300],
        ['medium', 600],
        ['big', 1024]
      ]);

      expect(MQ._toSortedArray(input)).not.to.be.eql([
        ['small', 300],
        ['big', 1024],
        ['medium', 600]
      ]);
    });
  });

  describe('mediaquery._makeSteps', function () {
    it('should be a function', function () {
      expect(MQ._makeSteps).to.exist
        .and.to.be.a('function');
    });

    it('should return an array', function () {
      expect(MQ._makeSteps([['x', 1], ['y', 2]])).to.be.an('array');
    });

    it('should add an Infinity element at the end if not already defined', function () {
      var input1 = [
        ['small', 300],
        ['medium', 600],
        ['big', 1024]
      ];

      var input2 = [
        ['small', 300],
        ['medium', 600],
        ['big', Infinity]
      ];

      expect(MQ._makeSteps(input1)).length.to.be(4);
      expect(MQ._makeSteps(input1)[3]).to.be.eql(Infinity);

      expect(MQ._makeSteps(input2)).length.to.be(3);
      expect(MQ._makeSteps(input2)[2]).to.be.eql(['big', Infinity]);
    });
  });

  describe('mediaquery._translate', function () {
    var input = [
      ['small', 300],
      ['medium', 600],
      ['big', 1024],
      ['huge', Infinity]
    ];

    var output = [
      ['small', 'screen and (max-width: 300px)'],
      ['medium', 'screen and (min-width: 301px) and (max-width: 600px)'],
      ['big', 'screen and (min-width: 601px) and (max-width: 1024px)'],
      ['huge', 'screen and (min-width: 1025px)']
    ];

    it('should be a function', function () {
      expect(MQ._translate).to.exist
        .and.to.be.a('function');
    });

    it('should return an array', function () {
      expect(MQ._translate(input)).to.be.an('array');
    });

    it('should translate numerical breakpoints to proper media queries strings', function () {
      expect(MQ._translate(input)).to.be.eql(output);
    });
  });

  describe('mediaquery.asArray', function () {
    var input = {
      small: 300,
      testFun: function () {},
      medium: 600,
      string: 'a string',
      testObj: {},
      tablet: 'tablet media query',
      testArr: [],
      big: 1024,
      huge: Infinity
    };

    var output = [
      ['small', 'screen and (max-width: 300px)'],
      ['medium', 'screen and (min-width: 301px) and (max-width: 600px)'],
      ['big', 'screen and (min-width: 601px) and (max-width: 1024px)'],
      ['huge', 'screen and (min-width: 1025px)'],
      ['string', 'a string'],
      ['tablet', 'tablet media query']
    ];

    it('should be a function', function () {
      expect(MQ.asArray).to.exist
        .and.to.be.a('function');
    });

    it('should return an array', function () {
      expect(MQ.asArray(input)).to.be.an('array');
    });

    it('should convert the object to proper media queries', function () {
      expect(MQ.asArray(input)).to.be.eql(output);
    });
  });

  describe('mediaquery.asObject', function () {
    var input = {
      small: 300,
      testFun: function () {},
      medium: 600,
      string: 'a string',
      testObj: {},
      tablet: 'tablet media query',
      testArr: [],
      big: 1024,
      huge: Infinity
    };

    var output = {
      small: 'screen and (max-width: 300px)',
      medium: 'screen and (min-width: 301px) and (max-width: 600px)',
      big: 'screen and (min-width: 601px) and (max-width: 1024px)',
      huge: 'screen and (min-width: 1025px)',
      string: 'a string',
      tablet: 'tablet media query'
    };

    it('should be a function', function () {
      expect(MQ.asObject).to.exist
        .and.to.be.a('function');
    });

    it('should return an array', function () {
      expect(MQ.asObject(input)).to.be.an('object');
    });

    it('should convert the object to proper media queries', function () {
      expect(MQ.asObject(input)).to.be.eql(output);
    });
  });
});
