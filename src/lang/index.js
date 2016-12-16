const savedLang = localStorage.getItem('localization');
const lang = require(`./${savedLang || 'en'}.json`);

export const langs = [
  'en',
  'de',
  'ru',
];

export default lang;
