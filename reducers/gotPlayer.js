import { playerActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case playerActions.REQUEST:
      return Object.assign({}, {loading: true}, state);
    case playerActions.OK:
      return Object.assign({}, {        loading: false,
        player: action.payload.profile}, state);
    case playerActions.ERROR:
      return Object.assign({}, {        loading: false,
        error: true}, state);
    default:
      return state;
  }
};
