import { appBarActions } from '../actions';

const initialState = {
  open: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case appBarActions.OPEN:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
};
