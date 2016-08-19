const SET_ACTIVE_TAB = 'tabs/SET_ACTIVE_TAB';

export const tabActions = {
  SET_ACTIVE_TAB,
};

export const setActiveTab = tab => ({
  type: SET_ACTIVE_TAB,
  tab,
});
