import { searchActions } from '../actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  query: '',
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchActions.START:
      return {
        ...state,
        done: false,
        error: false,
        loading: true,
      };
    case searchActions.QUERY:
      return {
        ...state,
        query: action.query
      };
    case searchActions.DONE:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        searchResults: action.payload,
      };
    case searchActions.ERROR:
      return {
        ...state,
        done: false,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
