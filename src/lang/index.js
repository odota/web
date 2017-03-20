/* eslint-disable global-require */
export const langs = [
  {
    value: 'en-US',
    native: 'English (US)',
    data: require('./en-US.json'),
  }, {
    value: 'bg-BG',
    native: 'български bǎlgarski',
    data: require('./bg-BG.json'),
  }, {
    value: 'cs-CZ',
    native: 'Čeština',
    data: require('./cs-CZ.json'),
  }, {
    value: 'de-DE',
    native: 'Deutsch',
    data: require('./de-DE.json'),
  }, {
    value: 'es-ES',
    native: 'Español (España)',
    data: require('./es-ES.json'),
  }, {
    value: 'es-PE',
    native: 'Español (América Latina)',
    data: require('./es-PE.json'),
  }, {
    value: 'fi-FI',
    native: 'Suomi',
    data: require('./fi-FI.json'),
  }, {
    value: 'fr-FR',
    native: 'Français',
    data: require('./fr-FR.json'),
  }, {
    value: 'it-IT',
    native: 'Italiano',
    data: require('./it-IT.json'),
  }, {
    value: 'ja-JP',
    native: '日本語',
    data: require('./ja-JP.json'),
  }, {
    value: 'ko-KR',
    native: '한국어',
    data: require('./ko-KR.json'),
  }, {
    value: 'ms-MY',
    native: 'Bahasa Melayu',
    data: require('./ms-MY.json'),
  }, {
    value: 'nl-NL',
    native: 'Nederlands',
    data: require('./nl-NL.json'),
  }, {
    value: 'pl-PL',
    native: 'Polszczyzna',
    data: require('./pl-PL.json'),
  }, {
    value: 'pt-BR',
    native: 'Português Brasileiro',
    data: require('./pt-BR.json'),
  }, {
    value: 'ru-RU',
    native: 'Русский',
    data: require('./ru-RU.json'),
  }, {
    value: 'sv-SE',
    native: 'Svenska',
    data: require('./sv-SE.json'),
  }, {
    value: 'tr-TR',
    native: 'Türkçe',
    data: require('./tr-TR.json'),
  }, {
    value: 'uk-UA',
    native: 'Українська',
    data: require('./uk-UA.json'),
  }, {
    value: 'vi-VN',
    native: 'Tiếng Việt',
    data: require('./vi-VN.json'),
  }, {
    value: 'zh-CN',
    native: '简化字',
    data: require('./zh-CN.json'),
  }, {
    value: 'zh-TW',
    native: '繁體字',
    data: require('./zh-TW.json'),
  },
];
const savedLang = window.localStorage && window.localStorage.getItem('localization');
const langToUse = (langs.find(lang => lang.value === savedLang) || langs[0]).data;
export default langToUse;
