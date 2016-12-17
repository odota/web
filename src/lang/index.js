const savedLang = window.localStorage && window.localStorage.getItem('localization');
const lang = require(`./${savedLang || 'en'}.json`);

export const langs = [
  {
    value: 'en',
    en: lang.language_en,
    native: 'English',
  }, {
    value: 'de',
    en: lang.language_de,
    native: 'Deutsch',
  }, {
    value: 'es',
    en: lang.language_es,
    native: 'Español',
  }, {
    value: 'fi',
    en: lang.language_fi,
    native: 'Suomi',
  }, {
    value: 'fr',
    en: lang.language_fr,
    native: 'Français',
  }, {
    value: 'it',
    en: lang.language_it,
    native: 'Italiano',
  }, {
    value: 'ko',
    en: lang.language_ko,
    native: '한국어',
  }, {
    value: 'ms',
    en: lang.language_ms,
    native: 'Malay',
  }, {
    value: 'nl',
    en: lang.language_nl,
    native: 'Nederlands',
  }, {
    value: 'pl',
    en: lang.language_pl,
    native: 'Polszczyzna',
  }, {
    value: 'pt',
    en: lang.language_pt,
    native: 'Português',
  }, {
    value: 'ru',
    en: lang.language_ru,
    native: 'ру́сский',
  }, {
    value: 'sv',
    en: lang.language_sv,
    native: 'Svenska',
  }, {
    value: 'tr',
    en: lang.language_tr,
    native: 'Türkçe',
  }, {
    value: 'uk',
    en: lang.language_uk,
    native: 'Українська',
  }, {
    value: 'vi',
    en: lang.language_vi,
    native: 'Tiếng Việt',
  }, {
    value: 'zh',
    en: lang.language_zh,
    native: '汉语/漢語',
  },
];

export default lang;
