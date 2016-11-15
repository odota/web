require('babel-register')({
  extensions: ['.js', '.jsx'],
  ignore: /node_modules\/.*/
});
require('css-modules-require-hook')({
  generateScopedName: '[name]_[local]',
});

const chai = require('chai');
const ignore = require('ignore-styles');

ignore.default(['.scss', '.sass', '.stylus', '.styl', '.less', '.gif', '.png', '.jpg']);
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js',
};

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());
