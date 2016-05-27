import { playerActions } from '../actions';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case playerActions.REQUEST:
      return {
        ...state,
        loading: true
      };
    case playerActions.OK:
      return {
        ...state,
        loading: false,
        player: action.payload.player
      };
    case playerActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
