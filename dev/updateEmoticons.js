const fs = require('fs');

process.chdir(__dirname);

try {
  fs.copyFileSync('../node_modules/dota2-emoticons/resources/images/emoticons', '../assets/images/dota2/emoticons');
  console.log('Success!');
} catch (err) {
  console.error(err);
}
