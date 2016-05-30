import { constantsActions } from '../actions';

const initialState = {
  loading: true,
  error: false,
  links: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constantsActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constantsActions.OK:
      return {
        state,
        ...action.payload,
        loading: false,
        donations: action.payload.cheese,
      };
    case constantsActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
