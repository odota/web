import { requestActions } from 'actions';

const initialState = {
  replayBlob: null,
  matchId: '',
  progress: 0,
  error: '',
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActions.REQUEST:
      return {
        ...state,
        loading: true,
        done: false,
        error: false,
      };
    case requestActions.ERROR:
      return {
        ...state,
        loading: false,
        done: false,
        error: action.error,
      };
    case requestActions.PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    case requestActions.MATCH_ID:
      return {
        ...state,
        matchId: action.matchId,
      };
    default:
      return state;
  }
};
