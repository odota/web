/* eslint-disable global-require */
export const langs = [
  {
    value: 'en-US',
    native: 'English (US)',
    data: require('./en-US.json'),
  },
];
const savedLang = window.localStorage && window.localStorage.getItem('localization');
const selectedLang = langs.find(lang => lang.value === savedLang) || { };
export default { ...langs[0].data, ...selectedLang.data };
