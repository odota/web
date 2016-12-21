import { localization } from 'reducers';

export const setLocalization = ({ value }) =>
  (dispatch, getState) => {
    const locale = localization(getState());
    if (locale !== value) {
      try {
        localStorage.setItem('localization', value);
        location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };
