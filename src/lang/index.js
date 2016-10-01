/* eslint-disable global-require */
// TODO read/write language setting to local cookie
const language = 'en';
export default require(`./${language}.json`);
