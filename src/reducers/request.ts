import { requestActions } from '../actions/requestActions';

const initialState = {
  progress: 0,
  error: '',
  loading: false,
};

export default (
  state = initialState,
  action: { type: string; error: string; progress: number },
) => {
  switch (action.type) {
    case requestActions.START:
      return {
        ...state,
        loading: true,
      };
    case requestActions.ERROR:
      return {
        ...initialState,
        error: action.error || true,
      };
    case requestActions.OK:
      return initialState;
    case requestActions.PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};
