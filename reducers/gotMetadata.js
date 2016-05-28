import { metadataActions } from '../actions';

const initialState = {
  loading: true,
  error: false,
  links: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case metadataActions.REQUEST:
      return Object.assign({}, {loading: true}, state);
    case metadataActions.OK:
      return Object.assign({}, {loading: false,        links: action.payload.links,
        donations: action.payload.cheese}, state);
    case metadataActions.ERROR:
      return Object.assign({}, {        loading: false,
        error: true}, state);
    default:
      return state;
  }
};
