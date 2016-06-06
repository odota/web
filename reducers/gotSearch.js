import { searchActions } from '../actions';

const initialState = {
  loading: false,
  error: false,
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case searchActions.OK:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };
    case searchActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
