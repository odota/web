import { rankingActions } from './../actions';

const initialState = {
  loading: false,
  error: false,
  done: false,
  hero_id: 0,
  rankings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case rankingActions.START:
      return {
        ...state,
        done: false,
        error: false,
        loading: true,
      };
    case rankingActions.DONE:
      return {
        ...state,
        done: true,
        error: false,
        loading: false,
        hero_id: action.payload.hero_id,
        rankings: action.payload.rankings,
      };
    case rankingActions.ERROR:
      return {
        ...state,
        done: false,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
