/* eslint-disable import/no-extraneous-dependencies, no-console */
const fs = require('fs-extra');

process.chdir(__dirname);

try {
  fs.copySync('../node_modules/dota2-emoticons/resources/images/emoticons', '../assets/images/dota2/emoticons');
  console.log('Success!');
} catch (err) {
  console.error(err);
}
