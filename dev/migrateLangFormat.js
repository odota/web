
const fs = require('fs');
const path = require('path');

const langsPath = path.resolve(__dirname, '../src/lang');
const oldLangsPath = path.resolve(__dirname, '../src/lang/old');
const excludedLangKeys = ['title_template'];
const langs = fs.readdirSync(langsPath).filter(dir => ['.', '..', 'old', 'index.js'].includes(dir) === false);

if (!fs.existsSync(oldLangsPath)) {
  fs.mkdirSync(oldLangsPath);
}

langs.forEach((langFile) => {
  // Make a backup of the old file.
  if (!fs.existsSync(path.resolve(oldLangsPath, langFile))) {
    fs.copyFileSync(path.resolve(langsPath, langFile), path.resolve(oldLangsPath, langFile));
  }


  const lang = JSON.parse(fs.readFileSync(path.resolve(langsPath, langFile)));
  const pattern = /(%[^\s^%]+)/g;
  const updatedLang = {};
  Object.entries(lang).map(([langKey, string]) => {
    let count = 0;
    const replaced = string.split(pattern).map((split) => {
      if (excludedLangKeys.includes(langKey) === false && split.match(pattern)) {
        // eslint-disable-next-line no-plusplus
        return `{${count++}}`;
      }

      return split;
    });
    updatedLang[langKey] = replaced.join('');
    return updatedLang[langKey];
  });

  fs.writeFileSync(path.resolve(langsPath, langFile), JSON.stringify(updatedLang, undefined, '  '));
});

