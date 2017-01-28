const savedLang = window.localStorage && window.localStorage.getItem('localization');
const lang = require(`./${savedLang || 'en'}.json`);

export const langs = [
  {
    value: 'en',
    translated: lang.language_en,
    native: 'English',
  }, {
    value: 'de',
    translated: lang.language_de,
    native: 'Deutsch',
  }, {
    value: 'es',
    translated: lang.language_es,
    native: 'Español',
  }, {
    value: 'fi',
    translated: lang.language_fi,
    native: 'Suomi',
  }, {
    value: 'fr',
    translated: lang.language_fr,
    native: 'Français',
  }, {
    value: 'it',
    translated: lang.language_it,
    native: 'Italiano',
  }, {
    value: 'ko',
    translated: lang.language_ko,
    native: '한국어',
  }, {
    value: 'ms',
    translated: lang.language_ms,
    native: 'Malay',
  }, {
    value: 'nl',
    translated: lang.language_nl,
    native: 'Nederlands',
  }, {
    value: 'pl',
    translated: lang.language_pl,
    native: 'Polszczyzna',
  }, {
    value: 'pt',
    translated: lang.language_pt,
    native: 'Português',
  }, {
    value: 'ru',
    translated: lang.language_ru,
    native: 'ру́сский',
  }, {
    value: 'sv',
    translated: lang.language_sv,
    native: 'Svenska',
  }, {
    value: 'tr',
    translated: lang.language_tr,
    native: 'Türkçe',
  }, {
    value: 'uk',
    translated: lang.language_uk,
    native: 'Українська',
  }, {
    value: 'vi',
    translated: lang.language_vi,
    native: 'Tiếng Việt',
  }, {
    value: 'zh',
    translated: lang.language_zh,
    native: '汉语',
  },
];

export default lang;
