import { requestActions } from '../actions';

const initialState = {
  replay_blob: null,
  match_id: window.location.hash.slice(1),
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
        error: action.payload.error,
      };
    case requestActions.PROGRESS:
      return {
        ...state,
        progress: action.payload.progress,
      };
    case requestActions.MATCH_ID:
      return {
        ...state,
        match_id: action.match_id,
      };
    default:
      return state;
  }
};
