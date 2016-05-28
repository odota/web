import { playerActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case playerActions.REQUEST:
      return Object.assign({}, state, {loading: true});
    case playerActions.OK:
      return Object.assign({}, state, {        loading: false,
        player: action.payload.profile});
    case playerActions.ERROR:
      return Object.assign({}, state, {        loading: false,
        error: true});
    default:
      return state;
  }
};
