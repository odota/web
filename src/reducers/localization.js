export default (state = 'en', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getLocalization = state => state && state.app && state.app.localization;
