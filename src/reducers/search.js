import { searchActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  query: '',
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchActions.REQUEST:
      return {
        ...state,
        loading: true,
        done: false,
        error: false,
      };
    case searchActions.QUERY:
      return {
        ...state,
        query: action.query,
      };
    case searchActions.OK:
      return {
        ...state,
        loading: false,
        done: true,
        error: false,
        searchResults: action.payload,
      };
    case searchActions.ERROR:
      return {
        ...state,
        loading: false,
        done: false,
        error: true,
      };
    default:
      return state;
  }
};
