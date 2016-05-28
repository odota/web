import { matchActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case matchActions.REQUEST:
      return Object.assign({}, state, {loading: true});
    case matchActions.OK:
      return Object.assign({}, state, {loading: false, match: action.payload,});
    case matchActions.ERROR:
      return Object.assign({}, state, {loading: false, error: true,});
    default:
      return state;
  }
};
