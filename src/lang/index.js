const savedLang = window.localStorage && window.localStorage.getItem('localization');
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
    value: 'es',
    en: 'Spanish',
    native: 'Español',
  }, {
    value: 'fi',
    en: 'Finnish',
    native: 'Suomi',
  }, {
    value: 'fr',
    en: 'French',
    native: 'Français',
  }, {
    value: 'it',
    en: 'Italian',
    native: 'Italiano',
  }, {
    value: 'ko',
    en: 'Korean',
    native: '한국어',
  }, {
    value: 'ms',
    en: 'Malay',
    native: 'Malay',
  }, {
    value: 'nl',
    en: 'Dutch',
    native: 'Nederlands',
  }, {
    value: 'pl',
    en: 'Polish',
    native: 'Polszczyzna',
  }, {
    value: 'pt',
    en: 'Portuguese',
    native: 'Português',
  }, {
    value: 'ru',
    en: 'Russian',
    native: 'ру́сский',
  }, {
    value: 'sv',
    en: 'Swedish',
    native: 'Svenska',
  }, {
    value: 'tr',
    en: 'Turkish',
    native: 'Türkçe',
  }, {
    value: 'uk',
    en: 'Ukranian',
    native: 'Українська',
  }, {
    value: 'vi',
    en: 'Vietnamese',
    native: 'Tiếng Việt',
  }, {
    value: 'zh',
    en: 'Chinese',
    native: '汉语/漢語',
  },
];

export default lang;
