let savedLang = window.localStorage && window.localStorage.getItem('localization');
// savedLang needs to be 5 characters, since @albertcui updated the language file names
if (savedLang.length !== 5) {
  savedLang = null;
}
const lang = require(`./${savedLang || 'en-US'}.json`);

export const langs = [
  {
    value: 'en-US',
    translated: lang.language_en_us,
    native: 'English (US)',
  }, {
    value: 'bg-BG',
    translated: lang.language_bg,
    native: 'български bǎlgarski',
  }, {
    value: 'cs-CZ',
    translated: lang.language_cs,
    native: 'Čeština',
  }, {
    value: 'de-DE',
    translated: lang.language_de,
    native: 'Deutsch',
  }, {
    value: 'es-ES',
    translated: lang.language_es_es,
    native: 'Español (España)',
  }, {
    value: 'es-PE',
    translated: lang.language_es_419,
    native: 'Español (América Latina)',
  }, {
    value: 'fi-FI',
    translated: lang.language_fi,
    native: 'Suomi',
  }, {
    value: 'fr-FR',
    translated: lang.language_fr,
    native: 'Français',
  }, {
    value: 'it-IT',
    translated: lang.language_it,
    native: 'Italiano',
  }, {
    value: 'ja-JP',
    translated: lang.language_ja,
    native: '日本語',
  }, {
    value: 'ko-KR',
    translated: lang.language_ko,
    native: '한국어',
  }, {
    value: 'ms-MY',
    translated: lang.language_ms,
    native: 'Bahasa Melayu',
  }, {
    value: 'nl-NL',
    translated: lang.language_nl,
    native: 'Nederlands',
  }, {
    value: 'pl_PL',
    translated: lang.language_pl,
    native: 'Polszczyzna',
  }, {
    value: 'pt_BR',
    translated: lang.language_pt_br,
    native: 'Português Brasileiro',
  }, {
    value: 'ru-RU',
    translated: lang.language_ru,
    native: 'Русский',
  }, {
    value: 'sv-SE',
    translated: lang.language_sv,
    native: 'Svenska',
  }, {
    value: 'tr-TR',
    translated: lang.language_tr,
    native: 'Türkçe',
  }, {
    value: 'uk-UA',
    translated: lang.language_uk,
    native: 'Українська',
  }, {
    value: 'vi-VN',
    translated: lang.language_vi,
    native: 'Tiếng Việt',
  }, {
    value: 'zh-CN',
    translated: lang.language_zh_cn,
    native: '简化字',
  }, {
    value: 'zh-TW',
    translated: lang.language_zh_tw,
    native: '繁體字',
  },
];

export default lang;
