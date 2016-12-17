const savedLang = localStorage.getItem('localization');
const lang = require(`./${savedLang || 'en'}.json`);

export const langs = [
  {
    value: 'en',
    en: 'English',
  }, {
    value: 'de',
    en: 'German',
    native: 'Deutsch',
  }, {
    value: 'ru',
    en: 'Russian',
    native: 'Commie',
  },
];

export default lang;
