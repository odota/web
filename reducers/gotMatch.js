import { matchActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case matchActions.REQUEST:
      return {
        ...state,
        loading: true
      };
    case matchActions.OK:
      return {
        ...state,
        loading: false,
        match: action.payload
      };
    case matchActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
