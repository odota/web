import { localization } from 'reducers';

export const setLocalization = lang =>
  (dispatch, getState) => {
    const locale = localization(getState());
    if (locale !== lang) {
      try {
        localStorage.setItem('localization', lang);
        location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };
