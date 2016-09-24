import { distributionsActions } from 'actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case distributionsActions.REQUEST:
      return {
        ...state,
        loading: true,
        done: false,
        error: false,
      };
    case distributionsActions.OK:
      return {
        ...state,
        loading: false,
        done: true,
        error: false,
        data: action.payload,
      };
    case distributionsActions.ERROR:
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
