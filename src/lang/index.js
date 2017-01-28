const savedLang = window.localStorage && window.localStorage.getItem('localization');
const lang = require(`./${savedLang || 'en-US'}.json`);

export const langs = [
  {
    value: 'en-US',
    native: 'English (US)',
  }, {
    value: 'bg-BG',
    native: 'български bǎlgarski',
  }, {
    value: 'cs-CZ',
    native: 'Čeština',
  }, {
    value: 'de-DE',
    native: 'Deutsch',
  }, {
    value: 'es-ES',
    native: 'Español (España)',
  }, {
    value: 'es-PE',
    native: 'Español (América Latina)',
  }, {
    value: 'fi-FI',
    native: 'Suomi',
  }, {
    value: 'fr-FR',
    native: 'Français',
  }, {
    value: 'it-IT',
    native: 'Italiano',
  }, {
    value: 'ja-JP',
    native: '日本語',
  }, {
    value: 'ko-KR',
    native: '한국어',
  }, {
    value: 'ms-MY',
    native: 'Bahasa Melayu',
  }, {
    value: 'nl-NL',
    native: 'Nederlands',
  }, {
    value: 'pl_PL',
    native: 'Polszczyzna',
  }, {
    value: 'pt_BR',
    native: 'Português Brasileiro',
  }, {
    value: 'ru-RU',
    native: 'Русский',
  }, {
    value: 'sv-SE',
    native: 'Svenska',
  }, {
    value: 'tr-TR',
    native: 'Türkçe',
  }, {
    value: 'uk-UA',
    native: 'Українська',
  }, {
    value: 'vi-VN',
    native: 'Tiếng Việt',
  }, {
    value: 'zh-CN',
    native: '简化字',
  }, {
    value: 'zh-TW',
    native: '繁體字',
  },
];

export default lang;
