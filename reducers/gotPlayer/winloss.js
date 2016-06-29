import { playerWinLossActions } from '../../actions';

const initialState = {
  loading: true,
  error: false,
  win: null,
  lose: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case playerWinLossActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerWinLossActions.OK:
      return {
        ...state,
        loading: false,
        win: action.payload.win,
        lose: action.payload.lose,
      };
    case playerWinLossActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
