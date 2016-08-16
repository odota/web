import { requestActions } from '../actions';

const initialState = {
  replayBlob: null,
  matchId: window.location.hash.slice(1),
  progress: 0,
  error: '',
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActions.START:
      return {
        ...state,
        done: false,
        error: false,
        loading: true,
      };
    case requestActions.ERROR:
      return {
        ...state,
        done: false,
        loading: false,
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
        matchId: action.match_id,
      };
    default:
      return state;
  }
};
