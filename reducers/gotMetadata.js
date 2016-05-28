import { metadataActions } from '../actions';

const initialState = {
  loading: true,
  error: false,
  links: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case metadataActions.REQUEST:
      return Object.assign({}, state, {loading: true});
    case metadataActions.OK:
      return Object.assign({}, state, Object.assign({}, {loading: false}, action.payload));
    case metadataActions.ERROR:
      return Object.assign({}, state, {loading: false, error: true});
    default:
      return state;
  }
};
