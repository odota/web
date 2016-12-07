const babelRegister = require('babel-register');
const cssModulesRequireHook = require('css-modules-require-hook');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');
const dirtyChai = require('dirty-chai');
const ignore = require('ignore-styles');
const jsdom = require('jsdom').jsdom;

babelRegister({
  extensions: ['.js', '.jsx'],
  ignore: /node_modules\/.*/,
});
cssModulesRequireHook({
  generateScopedName: '[name]_[local]',
});

// TODO - figure out how to not ignore css. Currently we get errors due to @import and other css next features
// in our testing. May not be necessary unless we want to test certain classes existing on components.
ignore.default(['.scss', '.css', '.sass', '.stylus', '.styl', '.less', '.gif', '.png', '.jpg']);
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

chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.use(dirtyChai);
