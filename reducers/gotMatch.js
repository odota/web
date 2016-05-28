import { matchActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case matchActions.REQUEST:
      return Object.assign({}, {loading: true}, state);
    case matchActions.OK:
      return Object.assign({}, {loading: false, match: action.payload,}, state);
    case matchActions.ERROR:
      return Object.assign({}, {loading: false, error: true,}, state);
    default:
      return state;
  }
};
