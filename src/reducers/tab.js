import { tabActions } from 'actions';

const initialState = {
  activeTab: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case tabActions.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.tab,
      };
    default:
      return state;
  }
};

export const getTab = {
  getActiveTab: state => state.app.tab.activeTab,
};
