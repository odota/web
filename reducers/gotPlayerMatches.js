import { playerMatchesActions } from '../actions';

const initialState = {
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case playerMatchesActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerMatchesActions.OK:
      return {
        ...state,
        loading: false,
        matches: [...action.payload],
      };
    case playerMatchesActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
