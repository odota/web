import { githubPullsActions } from 'actions/githubPulls';

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case githubPullsActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case githubPullsActions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case githubPullsActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
