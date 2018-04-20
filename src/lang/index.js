/* eslint-disable global-require */
export const langs = [
  {
    value: 'en-US',
    native: 'English (US)',
  }, /* {
    value: 'bg-BG',
    native: 'български bǎlgarski',
  }, {
    value: 'cs-CZ',
    native: 'Čeština',
  }, */ {
    value: 'de-DE',
    native: 'Deutsch',
  }, {
    value: 'es-ES',
    native: 'Español',
  }, /* {
    value: 'es-PE',
    native: 'Español (América Latina)',
  }, {
    value: 'fi-FI',
    native: 'Suomi',
  },  {
    value: 'fr-FR',
    native: 'Français',
  }, */ {
    value: 'it-IT',
    native: 'Italiano',
  }, {
    value: 'ja-JP',
    native: '日本語',
  }, /* {
    value: 'ko-KR',
    native: '한국어',
  }, */ {
    value: 'ms-MY',
    native: 'Bahasa Melayu',
  }, /* {
    value: 'nl-NL',
    native: 'Nederlands',
  }, */ {
    value: 'pl-PL',
    native: 'Polski',
  }, {
    value: 'pt-BR',
    native: 'Português Brasileiro',
  }, {
    value: 'ro-RO',
    native: 'Română',
  }, {
    value: 'ru-RU',
    native: 'Русский',
  }, /* {
    value: 'sv-SE',
    native: 'Svenska',
  }, {
    value: 'tr-TR',
    native: 'Türkçe',
  },  {
    value: 'uk-UA',
    native: 'Українська',
  }, {
    value: 'vi-VN',
    native: 'Tiếng Việt',
  }, */ {
    value: 'zh-CN',
    native: '中文',
  }, /* {
    value: 'zh-TW',
    native: '中文 (繁體字)',
  }, */
];

// Temporary until we move fully to dynamic loaded strings
const savedLang = window.localStorage && window.localStorage.getItem('localization');
const selectedLang = langs.find(lang => lang.value === savedLang) || {};
const data = {
  'en-US': require('./en-US.json'),
  'de-DE': require('./de-DE.json'),
  'es-ES': require('./es-ES.json'),
  'it-IT': require('./it-IT.json'),
  'ja-JP': require('./ja-JP.json'),
  'ms-MY': require('./ms-MY.json'),
  'pl-PL': require('./pl-PL.json'),
  'pt-BR': require('./pt-BR.json'),
  'ro-RO': require('./ro-RO.json'),
  'ru-RU': require('./ru-RU.json'),
  'zh-CN': require('./zh-CN.json'),
};
export default { ...data[langs[0].value], ...data[selectedLang.value] };
