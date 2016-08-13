import { distributionsActions } from '../actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  distributions: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case distributionsActions.START:
      return {
        ...state,
        done: false,
        error: false,
        loading: true,
      };
    case distributionsActions.DONE:
      return {
        ...state,
        loading: false,
        error: false,
        done: true,
        distributionsResults: action.payload,
      };
    case distributionsActions.ERROR:
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
